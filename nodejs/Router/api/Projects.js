const express = require('express');
const router = express.Router();
const Project = require('./../../Models/Project');
const File = require('./../../Models/File');

router.post('/allProjects',(req,res) => {
    Project.find({email: req.body.email})
        .then(projects => {
            let projectList = projects.map((project) => {
                return {
                    projectName: project.projectName,
                    dateCreated: project.dateCreated,
                    lastModified: project.lastModified
                }
            });
            return res.json(projectList);
        })
});

router.post('/recentActivity',(req,res) => {
    Project.find({email: req.body.email})
        .then(projects => {
            return res.json(projects);
        })
});

router.post('/drafts',(req,res) => {
    Project.find({email: req.body.email})
        .then(projects => {
            return res.json(projects);            
        })
});

router.post('/create',(req,res) => {
    Project.findOne({projectName: req.body.projectName, email: req.body.email})
        .then(project => {
            if(project) {
                return res.status(400).json({errMsg: 'Project with this name already exists'});
            }

            let newProject = new Project({
                projectName: req.body.projectName,
                email: req.body.email,
                lastModified: Date.now()
            })

            newProject.save()
                .then(project => {
                    return res.json(project);
                })
                .catch(err => {
                    return res.status(504).json({errMsg: 'Save unsuccessful'});
                })
        });
});

router.post('/delete',(req,res) => {
    let projectNames = req.body.names.selectedProjects;
    let email = req.body.names.email;
    let passed = [];
    let failed = [];    

    projectNames.map((projectName) => {
        File.deleteMany({projectName: projectName})
        .then(() => {
            console.log(`cleared all files in project ${projectName}`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(504).json({msg: 'Failed to delete project(s)'});
        })
        Project.deleteOne({projectName: projectName, email: email})
            .then(() => {
                passed.push('passed');
            })
            .catch((err) => {
                failed.push('failed');
            })
    });  
    
    if(failed.length) {
        return res.status(504).json({msg: 'Failed to delete project(s)'});
    }

    return res.json({msg: 'Project(s) successfully deleted'});
});

module.exports = router;