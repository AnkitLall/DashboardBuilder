const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: {
        type: String
    },
    email: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date
    }
});

module.exports = Project = mongoose.model('project',ProjectSchema);