const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commandSchema = new Schema({
    orderNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    clientName: {
        type: String,
    },
    consultantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultant', 
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    note: {
        type: String
    },
    object: {
        type: Schema.Types.Mixed 
    }
}, { timestamps: true });



module.exports = mongoose.model('Command', commandSchema);