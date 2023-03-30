const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre("save", async function(next){
    const user = this
    if(!user.isModified("password")){
        next()
    }
    user.password = await bcrypt.hash(user.password,10)
})
UserSchema.methods.generateJwtToken = function(){
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{expiresIn:'5d'})
}
module.exports = mongoose.model('users',UserSchema)