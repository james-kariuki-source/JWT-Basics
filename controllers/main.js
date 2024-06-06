const jwt = require('jsonwebtoken')
const { BadRequest } = require('../errors')

const login = (req, res) => {
  const { username, password } = req.body

  //check in the controller
  if (!username || !password) {
    throw new BadRequest('Please provide username and password')
  }

  //since theres no database connection
  const id = new Date().getDate()

  //keep payload small
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'User created!', token })
}

const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = { login, dashboard }
