const UserModel = require('../../model/userModel')
const TokenModel = require('../../model/tokenModel')

const EMAIL_TYPE = 'EMAIL_TYPE'
const PHONE_TYPE = 'PHONE_TYPE'
const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
const PHONE_PATTERN = /^\d+$/

const getCredentialType = (userCredential) => {
  const userCredentialTypes = [
    {
      type: EMAIL_TYPE,
      pattern: EMAIL_PATTERN
    },
    {
      type: PHONE_TYPE,
      pattern: PHONE_PATTERN
    }
  ]

  const foundType = userCredentialTypes.find((credentialType) => {
    return credentialType.pattern.test(userCredential)
  })

  if (typeof foundType === 'undefined') {
    throw Error('Invalid credential type')
  }

  return foundType.type
}

const getUserByCredentail = async (userCredential) => {
  try {
    const credentialType = getCredentialType(userCredential)
    switch (credentialType) {
      case EMAIL_TYPE:
        return UserModel.findByEmail(userCredential)
      case PHONE_TYPE:
        return UserModel.findByPhone(userCredential)
      default:
        return false
    }
  } catch (error) {
    return false
  }
}

const createGuestUser = async (userData) => {
  try {
    const user = new UserModel(userData)
    const savedUser = await user.save()
    return savedUser
  } catch (error) {
    throw Error('Error while saving user')
  }
}

const isAuthenticated = async (userCredential, accessToken) => {
  try {
    const user = await getUserByCredentail(userCredential)
    if (!user) {
      return false
    }
    const token = await TokenModel.findOne({
      user: user._id,
      token: accessToken,
      type: 'access_token',
      expiredTime: {
        $gt: new Date()
      }
    })
    return !!token
  } catch (error) {
    return false
  }
}

module.exports = {
  getUserByCredentail,
  getCredentialType,
  createGuestUser,
  isAuthenticated
}
