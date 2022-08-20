const mongoose = require('mongoose');
const User = require('./models/User')
const Task = require('./models/Task')

const connectionUrl = "mongodb://127.0.0.1:27017/task-manager-api"
mongoose.connect(connectionUrl)

// const newUser = new User({
//   name: '      boslukluisim      ',
//   // age: 27,
//   email: '     asdasd@assdasd.com         '
// })

// newUser.save()
// .then(() => {
//   console.log("Saved:", newUser)
// })
// .catch(error => {
//   console.log("could not save", error)
// })

const newTask = new Task({
  description: 'Learn mongoose',
  // completed: false,
})

newTask.save()
.then(() => {
  console.log("Saved: ", newTask)
})
.catch(error => {
  console.log("could not save: ", error)
})