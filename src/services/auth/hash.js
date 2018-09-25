const crypto = require('crypto')

const createToken = async () => {
  try {
    const token = await crypto.randomBytes(process.even.TOKEN_LENGTH)
    return token.toString('hex')
  } catch (err) {
    return false
  }
}

module.exports = {
  createToken
}
