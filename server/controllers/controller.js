const db = require('../models/models');
const Controller = {};

Controller.postLogin = (req, res, next)=>{

  //grab username and password from the request body
  let username = req.body.username;
  let password = req.body.password;

  //create sql query for where username is equal to header username
  let sqlQuery = "select * from users where username=\'"+username+"\'";
  db.query(sqlQuery, (err, response) => {
      if (err) {
        console.log(err.stack)
        next(err);
      } else {
        //check the response and grab the first element which is the singular row returned from db
        //check if the response is empty
        //if empty add error message "username doesnt exist"
        if(response.rows.length === 0){
          res.locals.error = 'username does not exist'
        }else{
            //if not empty
            //compare password
            //if pw doesnt match set error message, "password is incorrect"
            //else (pw matches) we return {username: name,token: jwt}
            if(response.rows[0].password !== password){
              res.locals.error = 'password is incorrect';
            }else{
              res.locals.username = username;
              //figure out jwt later
            }
        }

      }
      console.log(res.locals)
      next()
    })
}

Controller.postSignUp = (req, res, next)=>{
    
}

Controller.postPeriod = (req, res, next)=>{
    
}

Controller.getPeriod = (req, res, next) => {
  
}

module.exports = Controller;


