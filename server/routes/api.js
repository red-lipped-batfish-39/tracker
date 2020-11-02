

const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();


//route to middleware that logs in a user
router.post('/login', controller.postLogin, (req, res)=>{
    res.status(200).json(res.locals)
})

//route to middleware that signs up a new user
router.post('/signup', controller.postSignUp, (req, res)=>{
    res.status(200).json(res.locals)
})

//router to middleware that adds a new period
router.post('/period', controller.postPeriod, controller.makePeriodArray, (req, res)=>{
    res.status(200).json(res.locals);
})

//route to middleware that returns all periods for a given user
router.post('/getallperiods', controller.getAllPeriods, controller.makePeriodArray, (req, res)=>{
    res.status(200).json(res.locals);
})

//route to middleware that deletes a period and returns all periods for a given user
router.delete('/period', controller.deletePeriod, controller.makePeriodArray, (req, res)=>{
    res.sendStatus(200);
})


module.exports = router;