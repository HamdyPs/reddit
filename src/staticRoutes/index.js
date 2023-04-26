const router = require("express").Router();
const postRoutes = require("./post.router");
const subredditRoutes = require("./subreddit.router");
const profileRoutes = require("./profile.router");
const userRoutes = require("./user.router");
const signinRoutes = require("./signin.router");
const settingRoutes = require("./setting.router");
const registerRoutes = require("./register.router");

router.use(postRoutes);
router.use(subredditRoutes);
router.use(profileRoutes);
router.use(userRoutes);
router.use(signinRoutes);
router.use(registerRoutes);
router.use(settingRoutes);

module.exports = router;
