const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task');
const { JsonWebTokenError } = require('jsonwebtoken');

const app = express()
const port = process.env.PORT || 3000

//#region middleware

app.use((req, res, next) => {
  
  next()
})

//#endregion

// #region configs

const connectionUrl = "mongodb://127.0.0.1:27017/task-manager-api"
mongoose.connect(connectionUrl)

app.use(express.json())


// #endregion

// #region routes

app.get('', (req, res) => {
  res.send("hello there")
})

app.use(userRouter) 
app.use(taskRouter) 

// #endregion


app.listen(port, () => {
  console.log("Server is running on port " + port)
})
