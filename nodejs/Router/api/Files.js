const express = require('express');
const router = express.Router();
const File = require('../../Models/File');
const { json } = require('body-parser');

router.post('/create', (req,res) => {
    File.findOne({fileName: req.body.fileName, projectName: req.body.projectName, email: req.body.email})
        .then(file => {
            if(file) {
                return res.status(400).json({errMsg: 'File with this name already exists'});
            }

            let newFile = new File({
                fileName: req.body.fileName,
                projectName: req.body.projectName,
                email: req.body.email,
                fileConfig: req.body.fileConfig
            })

            newFile.save()
                .then(file => {
                    return res.json(file)
                })
                .catch(err => {
                    return res.status(504).json({errMsg: 'Save Failed'});
                })
        })
});

router.post('/allFiles', (req,res) => {
    File.find({projectName: req.body.projectName})
        .then(files => {
            let filesList = files.map((file) => {
                return {
                    fileName: file.fileName,
                    projectName: file.projectName,
                    fileConfig: file.fileConfig
                }
            });

            return res.json(filesList);
        })
});

router.post('/delete',(req,res) => {
    let fileNames = req.body.names.fileSelected;
    let projectName = req.body.names.projectName;
    let email = req.body.names.email;
    let passed = [];
    let failed = [];

    fileNames.map((fileName) => {
        File.deleteOne({fileName: fileName,projectName: projectName, email: email})
            .then(() => {
                passed.push('passed');
            })
            .catch((err) => {
                failed.push('failed');
            })
    });  
    
    if(failed.length) {
        return res.status(504).json({msg: 'Failed to delete file(s)'});
    }

    return res.json({msg: 'File(s) successfully deleted'});
});

router.post('/updateConfig', (req,res) => {
    let newConfig = JSON.stringify(req.body.newConfig.fileConfig);
    let fileName = req.body.newConfig.fileName;
    let projectName = req.body.newConfig.projectName;
    let email = req.body.newConfig.email;

    File.updateOne({fileName,projectName,email},{fileConfig: newConfig})
        .then(() => {
            return res.json('Updated successfully');
        })
        .catch(err => {
            res.json(err);
        })
});

module.exports = router