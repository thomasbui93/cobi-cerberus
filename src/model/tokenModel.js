const mongoose = require('mongoose')
const { Schema } = mongoose

const tokenSchema = new Schema({
    token: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        },
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['access_token', 'refresh_token']
    },
    grantedTime: {
        type : Date,
        default: Date.now
    },
    expiredTime: {
        type: Date,
        default: Date.now
    }
})

class TokenSchema {}

tokenSchema.loadClass(TokenSchema)

module.exports = mongoose.model('Token', tokenSchema)