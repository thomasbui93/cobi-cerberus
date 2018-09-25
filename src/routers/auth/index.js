const { Router } = require('express')
const {
  requestLogin, authenticate, refreshAccessToken, invalidateToken, userRegister
} = require('./controllers')

const router = Router()

router.post('/register', userRegister)
router.post('/request-login', requestLogin)
router.post('/authenticate', authenticate)
router.post('/refresh-token', refreshAccessToken)
router.post('/invalidate-token', invalidateToken)

module.exports = router
