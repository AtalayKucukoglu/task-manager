const jwt = require('jsonwebtoken')
const User = require('../models/User');

const auth = async (req, res, next) => {
  console.log("auth middleware")
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log("🚀 ~ file: auth.js ~ line 8 ~ auth ~ token", token)
    const decoded = jwt.verify(token, 'SECRETCODE')
    console.log("🚀 ~ file: auth.js ~ line 9 ~ auth ~ decoded", decoded)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    console.log("🚀 ~ file: auth.js ~ line 12 ~ auth ~ user", user)
    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ message: 'A valid authentication token is needed.' })
  }
}


module.exports = auth