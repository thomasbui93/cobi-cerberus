const { generateLoginUrl, refreshToken, invalidateToken } = require('../../services/auth/token')
const { createGuestUser, isAuthenticated } = require('../../services/auth/user')

const userRegister = async (req, res, next) => {
  try {
    const user = await createGuestUser(req.body)
    res.json({
      status: true,
      data: user
    })
  } catch (err) {
    next(err)
  }
}

const requestLogin = async (req, res, next) => {
  try {
    const tokenData = await generateLoginUrl(req.param('credential'))
    res.json({
      data: tokenData
    })
  } catch (err) {
    next(err)
  }
}

const authenticate = async (req, res, next) => {
  try {
    const { user, accessToken } = req.body
    const isApproved = await isAuthenticated(user, accessToken)
    res.json({
      data: {
        isApproved
      }
    })
  } catch (err) {
    next(err)
  }
}

const refreshAccessToken = async (req, res, next) => {
  try {
    const { user, token } = req.body
    const tokenData = await refreshToken(user, token)
    res.json({
      data: tokenData
    })
  } catch (err) {
    next(err)
  }
}

const invalidateTokens = async (req, res, next) => {
  try {
    const { token } = req.body
    await invalidateToken(token.split(','))
    res.json({
      status: true,
      data: {
        sucess: 'ok'
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  requestLogin,
  authenticate,
  refreshAccessToken,
  invalidateToken,
  userRegister,
  invalidateTokens
}
