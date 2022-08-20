const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number.")
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid")
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
})

// methods are accessible on instances
schema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'SECRETCODE')
  this.tokens = this.tokens.concat({ token })
  await this.save()
  return token
}

// statics are accessible on the model
schema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login.')
  }

  const isMatch = await bcryptjs.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login.')
  }
  return user
}

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, 8)
  }
  next()
})

const User = mongoose.model('User', schema)

module.exports = User