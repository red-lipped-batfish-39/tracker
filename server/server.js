const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//set up app to run on express
const app = express();

//link the router so we can set up calls to api
const apiRouter = require('./routes/api');

const PORT = 3000;

//setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//going to build off of build folder file created by webpack
app.use('/build', express.static(path.join(__dirname, '../build')));

//all calls to website/api go to the router
// app.use('/api', apiRouter);

//send index html to link to our react app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

  

//internal errors
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
