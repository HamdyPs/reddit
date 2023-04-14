const Joi = require('joi')

const postSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(3).max(1000).required(),
  photo:Joi.string.required()
})

module.exports = postSchema
