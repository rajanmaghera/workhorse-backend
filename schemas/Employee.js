import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    first: String,
    last: String,
    dob: Date,
    role: String,
    email: String,
    manager: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager'},
    workplace: {type: mongoose.Schema.Types.ObjectID, ref: 'Workplace'}
})

export default mongoose.model('Employee', schema)