import mongoose from 'mongoose'

var foobarSchema = new mongoose.Schema({
    first: {type: String, required: true},
    last: String,
    role: String,
    favouriteNumber: {
        type: Number,
        min: [1, "Your number is too little"],
        max: [10, "Your number is too large"]
    }
}, {timestamps: true})

export default mongoose.model("foobar", foobarSchema)