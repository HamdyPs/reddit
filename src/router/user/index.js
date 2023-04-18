const userRouter = require('express').Router();
const { signUp, signin, getSignUpPage,getProfilePage, getUserData,getSettingPage, updateUserData} = require('../../controller/users')
const auth = require('../../helper/auth');

userRouter.post('/signup', signUp);
userRouter.post('/signin', signin);
userRouter.get('/resgister', getSignUpPage)
userRouter.get('/profile', getProfilePage)
userRouter.get('/profileSitting', getSettingPage)
userRouter.get('/sitting',auth, getUserData)
userRouter.put('/update',auth, updateUserData)


module.exports = userRouter