const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    }
})

const userSchema = new Schema({
    email: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        },
        required: true
    },
    phone: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        },
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    profile: profileSchema
})

class UserSchema {
    static findByEmail(email) {
        return this.findOne({
            email
        })
    }

    static findByPhone(phone) {
        return this.findOne({
            phone
        })
    }
}

userSchema.loadClass(UserSchema)

module.exports = mongoose.model('User', userSchema)