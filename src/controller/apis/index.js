const getNarutoApi = (req, res)=>{
  fetch('https://api.narutodb.xyz/character')
  .then((result)=> result.json())
  .then(data => res.status(200).json(data.characters))
  .catch(console.log)
}

const getFreeGamesApi = (req, res) =>{
  fetch('https://www.freetogame.com/api/games')
  .then((result)=> result.json())
  .then(data => res.status(200).json(data))
  .catch(console.log)
}
const getRandomAnimeApi = (req, res) =>{
  fetch('https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0')
  .then((result)=> result.json())
  .then(data => res.status(200).json(data.data))
  .catch(console.log)
}
module.exports = {getNarutoApi,getFreeGamesApi,getRandomAnimeApi}