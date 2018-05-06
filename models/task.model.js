const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model('Tasks', TaskSchema);