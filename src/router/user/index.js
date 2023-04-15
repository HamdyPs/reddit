const userRouter = require('express').Router();
const { signUp, signin, getSignUpPage} = require('../../controller/users')

userRouter.post('/signup', signUp);
userRouter.post('/signin', signin);
userRouter.get('/resgister', getSignUpPage)


module.exports = userRouter