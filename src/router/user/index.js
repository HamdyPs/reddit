const router = require("express").Router();

const { signup, signin, getUserData, updateUserData, forgotPassword, updatePasswordUser,getUserQuestions,logOut } = require("../../controller/users");
const { auth } = require("../../helper/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/userdata", auth, getUserData);
router.put("/", auth, updateUserData);
router.put("/resetPassword", auth, updatePasswordUser);
router.post('/forgotPassword', forgotPassword)
router.get('/questions', getUserQuestions)
router.get('/logout',logOut)


module.exports = router;
