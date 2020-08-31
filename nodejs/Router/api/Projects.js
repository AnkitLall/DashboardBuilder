const express = require('express');
const router = express.Router();
const Project = require('./../../Models/Project');

router.post('/allProjects',(req,res) => {
    Project.find({email: req.body.email})
        .then(projects => {
            return res.json(projects);
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

router.post('/add/newProject',(req,res) => {
    
})

module.exports = router;