const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: mongoose.Schema.Types.String, ref: 'user' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    bgColor: { type: String, default: '#ffffff' },
    date: { type: Date, default: Date.now }
})
module.exports = mongoose.model('notes', noteSchema)