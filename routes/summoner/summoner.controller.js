const axios = require('axios');
const { API_KEY } = process.env;

exports.user = async (req, res) => {
  const nickname = encodeURI(req.query.nickname);
  const { data } = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}`, {
    headers: {
      "X-Riot-Token": API_KEY
    }
  });
  const { summonerName, name, summonerLevel, profileIconId } = data;
  res.render('summoner/user', {
    summonerName,
    name,
    summonerLevel
  });
};