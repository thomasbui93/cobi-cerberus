const dayjs = require('dayjs')
const { getUserByCredentail } = require('./user')
const { createToken } = require('./hash')
const TokenModel = require('../../model/tokenModel')

const generateToken = async (user, type) => {
  try {
    const tokenString = await createToken()
    const grantedTime = dayjs()
    const expiredTime = dayjs()
    if (type === 'access_token') {
      expiredTime.add('30', 'minute')
    } else {
      expiredTime.add('12', 'hour')
    }
    const token = new TokenModel({
      token: tokenString,
      user,
      type,
      grantedTime: new Date(grantedTime.toString()),
      expiredTime: new Date(expiredTime.toString())
    })
    const savedToken = await token.save()
    return savedToken.token
  } catch (error) {
    throw Error('Error while create token', user._id, type)
  }
}

const generateLoginUrl = async (userCredential) => {
  try {
    const user = await getUserByCredentail(userCredential)
    if (!user) {
      throw Error('No user found in database')
    } else {
      const accessToken = await generateToken(user, 'access_token')
      const refreshToken = await generateToken(user, 'refresh_token')
      return {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    }
  } catch (error) {
    throw Error('Failed to generate login url')
  }
}
const isValidToken = async (userCredential, requestedToken) => {
  try {
    const user = await getUserByCredentail(userCredential)
    if (!user) {
      return false
    }
    const token = await TokenModel.findOne({
      user: user._id,
      token: requestedToken,
      expiredTime: {
        $gt: new Date()
      }
    })
    return {
      user,
      token
    }
  } catch (error) {
    return false
  }
}

const refreshToken = async (user, token) => {
  try {
    const isValid = await isValidToken(user, token)
    if (!isValid) {
      return false
    }
    const accessToken = await generateToken(user, 'access_token')
    return {
      access_token: accessToken,
      refresh_token: token
    }
  } catch (error) {
    throw Error('Error while refreshing token', error)
  }
}

const invalidateToken = async (tokens) => {
  try {
    await TokenModel.update({
      token: { $in: tokens }
    }, {
      expiredTime: new Date()
    }, {
      multi: true
    })
  } catch (error) {
    throw Error('Error while invalidate token')
  }
}

module.exports = {
  generateLoginUrl,
  refreshToken,
  invalidateToken,
  isValidToken
}
