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
    //check the jwt to make sure that the user is still logged in
      //how to de-encrypt????
    //if the user is no longer logged in throw an error, pass err into next()
    //if the user is still logged in, add the inputted period to the period database
    //add periods to res.locals (so that the data can be sent back to the client)
    const token = req.body.token;
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        console.log('Error: ', err);
        res.send(err);
      } else {
        let username = req.body.username;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let sqlQuery = `insert into period_date (start_date, end_date, user_id) values ('${startDate}', '${endDate}', (Select user_id from users where username='${username}'))`;

        db.query(sqlQuery, (err, response) => {
          //if post does not work, send an error
          if (err) {
            console.log(err.stack);
            next(err);
          } else {
            //add username and new jwt to res.locals
            res.locals.username = username;
            res.locals.token = jwt.sign({'username': username, expiresIn:'4h'}, process.env.secret);
            //if post is successful, send confirmation 
            console.log('posted a period');
            next();
          }
        })
      }
    })
}

Controller.getPeriod = (req, res, next) => {
  
}

module.exports = Controller;


