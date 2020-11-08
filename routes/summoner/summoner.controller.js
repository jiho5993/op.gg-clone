const champion = require('../../json/champion.json');
const axios = require('axios');
const { API_KEY } = process.env;

exports.user = async (req, res) => {
  const {
    summonerName,
    name,
    summonerLevel,
    profileIconId,
    accountId
  } = req.summoner;

  const { data } = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`, {
    headers: {
      "X-Riot-Token": API_KEY
    },
    params: {
      endIndex: 20
    }
  });

  const { matches } = data;
  for(let i=0; i<20; i++) {
    const key = matches[i].champion;
    matches[i].champion = champion[key];
  }

  res.render('summoner/user', {
    summonerName,
    name,
    summonerLevel,
    profileIconId,
    matchList: matches
  });
};

exports.matchInfo = async (req, res) => {
  const id = req.params.matchId;
  const nickname = req.query.nickname;
  let pId = null;

  const { data } = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${id}`, {
    headers: {
      "X-Riot-Token": API_KEY
    }
  });
  const { participants, participantIdentities } = data;

  participantIdentities.forEach(element => {
    const p = element.player;
    if(p.summonerName === nickname) {
      pId = element.participantId - 1;
    }
  });

  res.json(participants[pId]);
};