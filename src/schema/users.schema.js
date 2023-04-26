const Joi = require('joi')

const signUpSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  photo: Joi.string().required(),
  country: Joi.string().required(),
  question: Joi.string().required(),
  answer: Joi.string().required()
})
const signinSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().required()
})

module.exports = { signUpSchema, signinSchema }