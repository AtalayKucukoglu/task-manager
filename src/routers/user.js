const express = require('express');
const router = new express.Router()

const auth = require('../middleware/auth')

const User = require('../models/User');


// create user
router.post('/users', (req, res) => {
  console.log(req.body)
  const user = new User(req.body)
  console.log(user)
  user.save().then(() => {
    res.status(201).send(user)
  }).catch((err) => {
    console.log(err)
    res.status(400).send(err)
  });
})

// get all users
router.get('/users', auth, (req, res) => {
  User.find({}).then((users) => {
    res.send(users)
  }).catch((err) => {
    res.status(400).send(err)
  });
})

// get user by id
router.get('/users/:id', (req, res) => {
  const { id } = req.params
  User.findById(id).then((user) => {
    if (!user) {
      res.status(404).send()
    }

    res.send(user)
  }).catch((err) => {
    res.status(400).send(err)
  });
})

// update user by id
router.patch('/users/:id', async (req, res) => {
  const { id } = req.params
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'age', 'password']
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
  if (!isValidUpdate) {
    res.status(400).send({ message: 'Invalid update' })
  }

  try {
    // not using findByIdAndUpdate to be able to run pre save function
    let user = await User.findById(id)
    updates.forEach(update => user[update] = req.body[update])
    console.log(user)
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }

})

// delete user by id
router.delete('/users/:id', (req, res) => {
  const { id } = req.params
  User.findByIdAndDelete(id)
    .then(user => {
      if (!user) {
        return res.status(404).send()
      }
      res.send(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findByCredentials({ email, password })
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router