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
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

