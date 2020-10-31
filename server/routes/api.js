

const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

router.post('/login', controller.postLogin, (req, res)=>{
    res.status(200).json(res.locals)
})


router.post('/signup', controller.postSignUp, (req, res)=>{
    res.sendStatus(200)
})


router.post('/period', (req, res)=>{
    
})


router.get('/period', (req, res)=>{
    
})


module.exports = router;