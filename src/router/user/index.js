const userRouter = require('express').Router();
const { signUp, signin, getSignUpPage,getProfilePage} = require('../../controller/users')

userRouter.post('/signup', signUp);
userRouter.post('/signin', signin);
userRouter.get('/resgister', getSignUpPage)
userRouter.get('/profile', getProfilePage)


module.exports = userRouter