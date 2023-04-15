const apiRouter = require('express').Router();
const {getNarutoApi,getFreeGamesApi,getRandomAnimeApi} = require('../../controller/apis')
apiRouter.get('/naruto',getNarutoApi)
apiRouter.get('/games',getFreeGamesApi)
apiRouter.get('/animes',getRandomAnimeApi)

module.exports = apiRouter