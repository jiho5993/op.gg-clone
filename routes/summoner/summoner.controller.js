const champion = require('../../json/champion.json');
const axios = require('axios');
const { API_KEY } = process.env;

async function getMatchInfo(id, nickname) {
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

  return participants[pId];
}

exports.user = async (req, res) => {
  const {
    name,
    summonerLevel,
    profileIconId
  } = req.summoner;

  const { matches } = req.matchList;
  for(let i=0; i<20; i++) {
    const { stats } = await getMatchInfo(matches[i].gameId, name);
    const key = matches[i].champion;
    matches[i].champion = champion[key];
    matches[i].win = stats.win ? "승리" : "패배";
  }

  res.render('summoner/user', {
    name,
    summonerLevel,
    profileIconId,
    matchList: matches
  });
};

exports.matchInfo = async (req, res) => {
  const id = req.params.matchId;
  const nickname = req.query.nickname;
  const participant = await getMatchInfo(id, nickname);

  const { stats } = participant;
  const {
    win,
    item0, item1, item2, item3, item4, item5, item6,
    kills, deaths, assists,
    doubleKills, tripleKills, quadraKills, pentaKills,
    totalDamageDealtToChampions,
    totalMinionsKilled, neutralMinionsKilled
  } = stats;

  res.render('summoner/matchInfo', {
    win,
    itemList: [ item0, item1, item2, item6, item3, item4, item5 ],
    kills, deaths, assists,
    creepScore: totalMinionsKilled + neutralMinionsKilled
  });
};