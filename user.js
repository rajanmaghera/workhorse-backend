import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

export default mongoose.model("user", userSchema)