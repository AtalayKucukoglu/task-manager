const express = require('express');
const router = new express.Router()
const Task = require('../models/Task');


// create task
router.post('/tasks', (req, res) => {
  console.log(req.body)
  const task = new Task(req.body)
  console.log(task)
  task.save().then(() => {
    res.status(201).send(task)
  }).catch((err) => {
    console.log(err)
    res.status(400).send(err)
  });
})

// get all tasks
router.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks)
  }).catch((err) => {
    res.status(400).send(err)
  });
})

// get task by id
router.get('/tasks/:id', (req, res) => {
  const { id } = req.params
  Task.findById(id).then((task) => {
    if (!task) {
      res.status(404).send()
    }

    res.send(task)
  }).catch((err) => {
    res.status(400).send(err)
  });
})

// update task by id
router.patch('/tasks/:id', (req, res) => {
  const { id } = req.params
  const allowedUpdates = ['description', 'completed']
  const isValidUpdate = Object.keys(req.body).every(update => allowedUpdates.includes(update))
  if (!isValidUpdate) {
    res.status(400).send({ message: 'Invalid update' })
  }

  Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(task => {
      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// delete task by id
router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params
  Task.findByIdAndDelete(id)
    .then(task => {
      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})


module.exports = router