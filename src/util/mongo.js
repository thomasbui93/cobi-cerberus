const mongoose = require('mongoose')

const connectToMongo = () => {
    return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
}

module.exports = {
    connectToMongo
}