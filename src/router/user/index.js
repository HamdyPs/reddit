const userRouter = require('express').Router();
const { signUp, signin} = require('../../controller/users')

userRouter.post('/signup', signUp);
userRouter.post('/signin', signin);

module.exports = userRouter