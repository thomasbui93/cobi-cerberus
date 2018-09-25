const path = require('path')

const errorHandling = async (err, req, res, next) => {
  try {
    await logError(err);
    res.status(400).json({error: true, message: 'Error while process your request.'});
  } catch (err) {
    res.status(500).json({error: true, message: 'Internal error.'})
  }
}

const logError = err => {
  if(!err || typeof err !== 'object') {
    return false;
  }
  return console.log(err)
}

module.exports = {
    errorHandling,
    logError
}