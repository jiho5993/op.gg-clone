const axios = require('axios');
const { API_KEY } = process.env;

const summonerMiddleware = (req, res, next) => {
  const nickname = encodeURI(req.query.nickname);
  axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}`, {
    headers: {
      "X-Riot-Token": API_KEY
    }
  }).then(({ data }) => {
    req.summoner = data;
    next();
  }).catch(err => {
    res.render('error', { err });
  });
};

module.exports = summonerMiddleware;