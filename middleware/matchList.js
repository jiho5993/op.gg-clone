const axios = require('axios');
const { API_KEY } = process.env;

const matchListMiddleware = (req, res, next) => {
  const { accountId } = req.summoner;

  axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`, {
    headers: {
      "X-Riot-Token": API_KEY
    },
    params: {
      endIndex: 20
    }
  }).then(({ data }) => {
    req.matchList = data;
    next();
  }).catch(err => {
    res.render('error', { err });
  });
};

module.exports = matchListMiddleware;