

const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

router.post('/login', controller.postLogin, (req, res)=>{
    res.status(200).json(res.locals)
})


router.post('/signup', controller.postSignUp, (req, res)=>{
    res.status(200).json(res.locals)
})


router.post('/period', controller.postPeriod, controller.makePeriodArray, (req, res)=>{
    res.status(200).json(res.locals);
})


router.post('/getallperiods', controller.getAllPeriods, controller.makePeriodArray, (req, res)=>{
    res.status(200).json(res.locals);
})


module.exports = router;