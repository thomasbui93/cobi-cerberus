const { connectToMongo } = require('./mongo')
const routes = require('../routers')
const { errorHandling } = require('./error')

const bootstrap = async () => {
    try {
        await connectToMongo()
    } catch (err) {
        console.log(err)
    }
}

const startup = async (app) => {
    try {
        await bootstrap()
        routes(app)
        app.use(errorHandling)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    startup,
    bootstrap
}