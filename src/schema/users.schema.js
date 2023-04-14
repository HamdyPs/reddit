const Joi = require('joi')

const signUpSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  photo: Joi.string().required(),
  date: Joi.number().required(),
  country: Joi.string().required(),
  role: Joi.string().required(),
  phone: Joi.number().required(),
  address: Joi.string().required()
})
const signinSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().required()
})

module.exports = { signUpSchema, signinSchema }