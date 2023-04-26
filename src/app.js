const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { join } = require('path');
const router = require('./router');
const staticRouter = require("./staticRoutes");

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");
app.use(express.static(join(__dirname, '..', 'public')));
app.use('/api', router)
app.use(staticRouter);

module.exports = { app }
