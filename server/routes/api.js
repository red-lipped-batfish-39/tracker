

const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

router.post('/login', controller.postLogin, (req, res)=>{
    res.sendStatus(200)
})


router.post('/signup', (req, res)=>{
    
})


router.post('/period', (req, res)=>{
    
})


router.get('/period', (req, res)=>{
    
})


module.exports = router;