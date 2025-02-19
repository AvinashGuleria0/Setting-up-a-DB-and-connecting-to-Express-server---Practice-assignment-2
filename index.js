const express = require('express');
const { resolve } = require('path');
const {connect} = require("mongoose");
const user = require('./schema');
// const { connect } = require('http2');
require("dotenv").config();
const app = express();

app.use(express.json());

const port = process.env.PORT || 9000;
const DB_url = process.env.DB_URL;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/api/users', (req, res) => {
  const {name,email, password } = req.body;
  if (!name || !email || !password){
    res.status(400).json({message: `Bad request`});
  }

  const newUser = new user({name, email, password});
  
  newUser.save();
  
  res.status(201).json({message: `success`, newUser: newUser})


})

const connectToDb = async(url) => {
  await connect(url);
}

app.listen(port, async() => {
  
  try{

    await connectToDb(DB_url)
    
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Database connected successfully`);

  }catch(err){
    console.log(err);
  }
});
