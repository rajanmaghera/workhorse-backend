import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { access } from 'fs';
import { decode } from 'punycode';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    first: String,
    username: {type: String, unique: true},
    password: String,
    image: String
}, {timestamps: true})

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })},
    
    function (err) {
        next(err)
    })

userSchema.methods.comparePassword = function(candidatePassword,next) {

    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return (err);
        next(null,isMatch)

    })
}


userSchema.statics.getInformation = function(token, next) {

    userSchema.statics.authRun(token, function(err,obj){
        if (err) next(err)
        next(null, obj['user'])
    })
}

userSchema.statics.authRun = function(token, next){

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err) next (err)
        next (null,decoded)
    })

}

userSchema.methods.grantToken = function(candidatePassword,next){

    var userId = this._id

    console.log("here")
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return (err);
        if(isMatch){

            var payload = { user: userId }
            var refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.REFRESH_TOKEN_LIFE
            })
        
            // that.refreshToken = refreshToken


            var accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })

            next(null,accessToken)
    }
    else{next(null,null)}
    })




}

userSchema.methods.updateRefreshToken = function() {



}


export default mongoose.model("user", userSchema)