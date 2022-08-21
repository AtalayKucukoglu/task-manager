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

// login user
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

// logout user
router.post('/users/logout', auth, async (req, res) => { 
  try {
    req.user.tokens = req.user.tokens.filter(t => t.token !== req.token)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
 })

// logout from all sessions
router.post('/users/logoutAll', auth, async (req, res) => { 
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
 })

// get user profile
router.get('users/me', auth, async (req, res) => {
  res.send(req.user)
})

// get all users
// router.get('/users', auth, (req, res) => {
//   User.find({}).then((users) => {
//     res.send(users)
//   }).catch((err) => {
//     res.status(400).send(err)
//   });
// })

// get user by id
// router.get('/users/:id', (req, res) => {
//   const { id } = req.params
//   User.findById(id).then((user) => {
//     if (!user) {
//       res.status(404).send()
//     }

//     res.send(user)
//   }).catch((err) => {
//     res.status(400).send(err)
//   });
// })

// update user by id
router.patch('/users/me', auth, async (req, res) => {
  const { user, body } = req
  const updates = Object.keys(body)
  const allowedUpdates = ['name', 'email', 'age', 'password']
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
  if (!isValidUpdate) {
    res.status(400).send({ message: 'Invalid update' })
  }

  try {
    // not using findByIdAndUpdate to be able to run pre save function
    updates.forEach(update => user[update] = body[update])
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }

})

// delete user by id
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router