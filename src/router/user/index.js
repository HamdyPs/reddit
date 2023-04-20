const userRouter = require('express').Router();
const { signUp, signin, getSignUpPage,getProfilePage, getUserData,getSettingPage, updateUserData,updatePasswordUser,getSubredditsPage,getProfilesPage,addFriend} = require('../../controller/users')
const auth = require('../../helper/auth');

userRouter.post('/signup', signUp);
userRouter.post('/signin', signin);
userRouter.get('/resgister', getSignUpPage)
userRouter.get('/profile',auth, getProfilePage)
userRouter.get('/profiles/:userId',auth, getProfilesPage)
userRouter.get('/profileSitting',auth, getSettingPage)
userRouter.get('/sitting',auth, getUserData)
userRouter.put('/update',auth, updateUserData)
userRouter.put('/resetPassword',auth, updatePasswordUser)
userRouter.get('/subreddits/:subrditTitle', getSubredditsPage)
userRouter.get('/user/:friendId',auth, addFriend)



module.exports = userRouter