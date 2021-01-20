import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    first: String,
    last: String,
    role: String
}, {timestamps: true})

export default mongoose.model("employee", employeeSchema)