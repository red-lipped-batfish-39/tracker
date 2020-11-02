const db = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const saltRounds = 10;
const Controller = {};

Controller.postLogin = (req, res, next)=>{

  //grab username and password from the request body
  let username = req.body.username;
  let password = req.body.password;

  //create sql query for where username is equal to header username
  let sqlQuery = "select * from users where username=\'"+username+"\'";
  db.query(sqlQuery, (err, response) => {
      if (err) {
        console.log(err.stack);
        next(err);
      } else {
        //check the response and grab the first element which is the singular row returned from db
        //check if the response is empty
        //if empty add error message "username doesnt exist"
        if(response.rows.length === 0){
          res.locals.error = 'username does not exist';
          next()
        }else{
            //if not empty
            //compare password
            //if pw doesnt match set error message, "password is incorrect"
            //else (pw matches) we return {username: name,token: jwt}
            bcrypt.compare(password, response.rows[0].password, function(err, result) {
              // result == true
              if(result === false){
                res.locals.error = 'password is incorrect';
              }else{
                res.locals.username = username;
                res.locals.token = jwt.sign({'username': username, expiresIn:'4h'}, process.env.secret);
              }
              console.log(res.locals)
              next()
          });
        }

      }
    })
}

Controller.postSignUp = (req, res, next)=>{
  //initialize variables based on req data
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let hashPass;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // console.log("hash: ", hash);
        hashPass = hash;
        //initialize variable containing sqlQuery that inserts username, email, and password into users table
        let sqlQuery = `insert into users (username, email, password) values ('${username}', '${email}', '${hashPass}')`;
        //query the database
        db.query(sqlQuery, (err, response) => {
          //if signup does not work, send an error
          if (err) {
            console.log(err.stack);
            next(err);
          } else {
            //add jwt and username to res.locals
            res.locals.username = username;
            res.locals.token = jwt.sign({'username': username, expiresIn:'4h'}, process.env.secret);
            //if signup successful, send confirmation 
            console.log('added a user');
            next();
          }
        })
    });
  

  });
   
  
}




//user can add a period date
Controller.postPeriod = (req, res, next)=>{
    //initialize a token variable that is equal to token from the req.body
    const token = req.body.token;
    //verify that the token is correct
    jwt.verify(token, process.env.secret, (err, decoded) => {
      //if the token is incorrect, send an error
      if (err) {
        console.log('Error: ', err);
        res.send(err);
      } else {
        //if token is correct:
        //set username equal to the decoded username from the token
        let username = decoded.username;
        //set start date and end date equal to the start and end dates passed in through the request
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        //set sqlQuery variable equal to a query that adds a row to periods table; row will include start date, end date, and an id associated with the appropriate username on the users table
        let sqlQuery = `insert into period_date (start_date, end_date, user_id) values ('${startDate}', '${endDate}', (Select user_id from users where username='${username}'))`;
        
        //query the database
        db.query(sqlQuery, (err, response) => {
          //if post does not work, send an error
          if (err) {
            console.log(err.stack);
            next(err);
          } else {
            //add username to res.locals
            res.locals.username = username;
            //reset token on res.locals to a new jwt
            res.locals.token = jwt.sign({'username': username, expiresIn:'4h'}, process.env.secret);
            //if post is successful, console.log confirmation 
            console.log('posted a period');
            //move on to getAllPeriods middleware
            next();
          }
        })
      }
    })
}

Controller.getAllPeriods = (req, res, next) => {
  //initialize a token variable from the token on req.body
  const token = req.body.token;
  //verify the token
  jwt.verify(token, process.env.secret, (err, decoded)=>{
    if(err){
      console.log("Error:", err);
      res.send(err);
    }else{
      //if token verification successful, set username equal to the decoded username from the token
      let username = decoded.username;
      //set username on res.locals equal to the decoded username
      res.locals.username = username;
      //reset the token on res.locals to a new jwt
      res.locals.token = jwt.sign({'username': username, expiresIn:'4h'}, process.env.secret);
      //call the makePeriodArray helper function
      next();
    }

  })
  

}

//helper function that queries the database for all periods of given user and returns array  of all periods  (build the retturnn object in the parent function)
Controller.makePeriodArray = (req,  res, next) => {
  //initalize sqlQuery variable, set to a query that selects all of a users' periods
  let sqlQuery = `select start_date, end_date from period_date where user_id = (select user_id from users where username = '${res.locals.username}')`;
  //query the database
  db.query(sqlQuery, (err, response)=>{
    //if select doesnt work send error
    if(err){
      console.log(err.stack);
      next(err);
    }else{
      //set periods on res.locals equal to the response
      res.locals.periods = response.rows
      next();
    }
  })
}

Controller.deletePeriod = (req, res, next) => {
  //initalize token variable using token from the request body
  const token = req.body.token;
  //verify that the token is correct
  jwt.verify(token, process.env.secret, (err, decoded)=>{
    if(err){
      //if token is incorrect, send an error
      console.log("Error:", err);
      res.send(err);
    }else{
      //if token is correct, set startDate equal to start date from the request body
      let startDate = req.body.startDate;
      //set username equal to the username decoded from the token
      let username = decoded.username;
      //add username to res.locals object
      res.locals.username = username;
      //reset token and add to res.locals
      res.locals.token = jwt.sign({'username': username, expiresIn:'4h'}, process.env.secret);
      
      //create query to delete the period date row that has start date equal to start date passed into body
      let sqlQuery = `delete from period_date where user_id = (select user_id from users where username = '${username}') and  start_date = '${startDate}'`;

      //query the database
      db.query(sqlQuery, (err, response=>{
        
        if(err){
          //if error log the error
          console.log(err.stack);
          next(err);
        }else{
          
          //move on to makePeriodArray middleware
          next();
        }
        
      }))
      
    }

  })
}


module.exports = Controller;


