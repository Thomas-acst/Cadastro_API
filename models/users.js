const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next) {

const saltRounds = 10


    if(this.isNew){
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                return next(err);
            }

            bcrypt.hash(this.password, salt, (err, hashedPassword) => {
                if(err){
                    console.log(err) // A função next é uma função no roteador Express que, quando invocada, executa o middleware que sucede o middleware atual.
                    next(err)
            }else{
                this.password = hashedPassword
                next()
            }})
        })
    }
})




module.exports = mongoose.model('Cadastro', userSchema)