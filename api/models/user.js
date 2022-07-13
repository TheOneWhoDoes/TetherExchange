const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    },
	first_name: {
        type: String,
        required: true
    },
	last_name: {
        type: String,
        required: true
    },
	email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(), first_name: user.first_name.toString(), last_name: user.last_name.toString() }, "thisisasecretformyapp")

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.tokens
    delete userObject.password
    
    return userObject
}


userSchema.statics.findByCredentials = async (mobile, password) =>{
    const user = await User.findOne({ mobile })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatchPassword = await bcrypt.compare(password, user.password)

    if(!isMatchPassword){
        throw new Error('Unable to login')
    }

    return user
}


userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User