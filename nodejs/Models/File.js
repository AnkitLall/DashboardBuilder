const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    fileName: {
        type: String
    },
    projectName: {
        type: String
    },
    email: {
        type: String
    },
    fileConfig: {
        type: String
    }
});

module.exports = Files = mongoose.model('file',FileSchema);