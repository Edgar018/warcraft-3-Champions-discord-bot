const { getPlayerByName, getScore } = require("../services/index");
const getScoreOfMatches = require("../libs/getScoreOfMatches");
const canvasScore = require("../libs/canvas/canvasScore");
const getBattleTag = require("../libs/getbattletag");
const embedGamesIds = require("../libs/embed/embedGamesIds");

const getScoreAmericaAndEurope = async (message, playerOne, playerTwo, server) => {
	playerOne = await getBattleTag(playerOne, server);
	playerTwo = await getBattleTag(playerTwo, server);

	let matches = await getScore(playerOne, playerTwo, server);

	if (matches.matches.length === 0){
    if(server === 20){
      playerOne = await getBattleTag(playerOne, 10);
	    playerTwo = await getBattleTag(playerTwo, 10);

	    matches = await getScore(playerOne, playerTwo, 10);
      if(matches.matches.length === 0) return message.channel.send("no statistics found");
    }
  }

	playerOne = playerOne.replace(/%23/gi, "#");
	playerTwo = playerTwo.replace(/%23/gi, "#");
	const score = getScoreOfMatches(matches.matches, playerOne, playerTwo);
	const image = await canvasScore(score);
  return message.channel.send(image).then(() => {
		return message.channel.send(`type !gamesid ${playerOne.replace(/#\w+/gi, "")} vs ${playerTwo.replace(/#\w+/gi, "")} to see the id of each game`);
	});
  
};

module.exports = {
	name: "score",
	alias: [],
	run: async (client, message, args) => {
		try {
			if (args[0] === args[2]) {
				return message.channel.send("do not write the same name");
			}

			if (args[3] === "america") {
				return await getScoreAmericaAndEurope(message, args[0], args[2], 10);
			}
			return await getScoreAmericaAndEurope(message, args[0], args[2], 20);
		} catch (err) {
			return message.channel.send("Error");
		}
	}
};
