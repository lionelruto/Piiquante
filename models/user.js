const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//pour être sûr que des utilisateurs ne peuvent pas avoir le même email
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
