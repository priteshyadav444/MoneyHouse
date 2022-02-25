const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String, required: false },
    receiver: { type: String, required: false }
}, {
    timestamp: true
})

module.exports = mongoose.model('File', FileSchema)