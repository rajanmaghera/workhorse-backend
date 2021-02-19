import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: String,
    author: String,
})

export default mongoose.model('Book', schema)