const db = require('../models/models');
const bcrypt = require('bcrypt');
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
                //figure out jwt later
              }
              console.log(res.locals)
              next()
          });
        }

      }
    })
}

Controller.postSignUp = (req, res, next)=>{
  //initialize variables based on res data
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
            //if signup successful, send confirmation 
            console.log('added a user');
            next();
          }
        })
    });
  
  // console.log("hashPass: ", hashPass);
  });
   
  
}

// insert into users (username, email, password)
// values ('mark', 'mark', 'mark')


Controller.postPeriod = (req, res, next)=>{
    
}

Controller.getPeriod = (req, res, next) => {
  
}

module.exports = Controller;


