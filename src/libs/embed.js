const Discord = require("discord.js");
const { getLeagues } = require("../services/");

const emojiUnd = "<:Undead:771391362595160084>";
const emojiOrc = "<:ORC:771391078833061948>";
const emojiNe = "<:NE:771390761052012645>";
const emojiHum = "<:Hum:771391612663496725>";
const emojiRdm = "<:RDM:771392710522437653>";
const emojiGrandMaster = "<:GM:762322281371664385>";
const emojiMaster = "<:master:762322420253065216>";
const emojiDiamond = "<:Diamond:762323081041149982>";
const emojiPlatinum = "<:platinum:762322351161212969>";
const emojiGold = "<:gold:762322312321826848>";
const emojiSilver = "<:silver:762322243434053653>";
const emojiBronze = "<:Bronze:762322183589855295>";

const playerEmbed = async (name, stats, message, indexLeague) => {
	try {
		let embed = new Discord.MessageEmbed();
		let avatar = " ";
		let race;
		let leagueName;
		let iconRace;
		const leagues = await getLeagues();

		for (let i = 0; i < leagues[indexLeague].leagues.length; i++) {
			if (stats.league === leagues[indexLeague].leagues[i].id) {
				leagueName = leagues[indexLeague].leagues[i].name;
			}
		}

		if (leagueName === "Grand Master") {
			leagueName = emojiGrandMaster;
		} else if (leagueName === "Master") {
			leagueName = emojiMaster;
		} else if (leagueName === "Diamond") {
			leagueName = emojiDiamond;
		} else if (leagueName === "Platinum") {
			leagueName = emojiPlatinum;
		} else if (leagueName === "Gold") {
			leagueName = emojiGold;
		} else if (leagueName === "Silver") {
			leagueName = emojiSilver;
		} else if (leagueName === "Bronze") {
			leagueName = emojiBronze;
		}

		embed.addField("Rank", stats.rankNumber, true);
		embed.addField("Mode", "1v1", true);
		embed.addField("League", leagueName, true);

		if (stats.race === 1) {
			iconRace = emojiHum;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/HUMAN_10.jpg";
		} else if (stats.race === 2) {
			iconRace = emojiOrc;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/ORC_8.jpg";
		} else if (stats.race === 4) {
			iconRace = emojiNe;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/NIGHT_ELF_10.jpg";
		} else if (stats.race === 8) {
			iconRace = emojiUnd;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/UNDEAD_9.jpg";
		} else if (stats.race === 0) {
			iconRace = emojiRdm;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/RANDOM_9.jpg";
		}
		let battleTag = stats.player.playerIds[0].battleTag;
		battleTag = battleTag.replace(/#/gi, "%23");

		if (avatar === " ") {
			let newEmbed = new Discord.MessageEmbed();

			newEmbed.setColor("#0099ff")
				.setTitle(stats.player.name)
				.setThumbnail("https://www.w3champions.com/img/all.d725e22d.png")
				.addField("Message", "You have to play 5 games, GL HF!")
				.addField("View profile in w3champions", `[Click here](https://www.w3champions.com/player/${battleTag})`);

			return message.channel.send(newEmbed);
		}

		if (stats.race === 1) {
			race = "Human";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		} else if (stats.race === 2) {
			race = "Orc";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		} else if (stats.race === 4) {
			race = "Night";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		} else if (stats.race === 8) {
			race = "Undead";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		} else if (stats.race === 0) {
			race = "Random";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		}

		embed.setColor("#0099ff")
			.setTitle(stats.player.name + " " + iconRace)
			.setThumbnail(avatar)
			.addField("View profile in w3champions", `[Click here](https://www.w3champions.com/player/${battleTag})`);

		return message.channel.send(embed);
	} catch (error) {
		console.log(error);
		return message.channel.send("This player has not played 1v1 games this season.");
	}
};

const playerByName = async (name, stats, message, indexLeague) => {
	try {
		let embed = new Discord.MessageEmbed();
		let avatar = " ";
		let race;
		let leagueName;
		let iconRace;

		const leagues = await getLeagues();

		for (let i = 0; i < leagues[indexLeague].leagues.length; i++) {
			if (stats.league === leagues[indexLeague].leagues[i].id) {
				leagueName = leagues[indexLeague].leagues[i].name;
			}
		}

		if (leagueName === "Grand Master") {
			leagueName = emojiGrandMaster;
		} else if (leagueName === "Master") {
			leagueName = emojiMaster;
		} else if (leagueName === "Diamond") {
			leagueName = emojiDiamond;
		} else if (leagueName === "Platinum") {
			leagueName = emojiPlatinum;
		} else if (leagueName === "Gold") {
			leagueName = emojiGold;
		} else if (leagueName === "Silver") {
			leagueName = emojiSilver;
		} else if (leagueName === "Bronze") {
			leagueName = emojiBronze;
		}

		if (stats.player.race === 1) {
			iconRace = emojiHum;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/HUMAN_10.jpg";
		} else if (stats.player.race === 2) {
			iconRace = emojiOrc;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/ORC_8.jpg";
		} else if (stats.player.race === 4) {
			iconRace = emojiNe;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/NIGHT_ELF_10.jpg";
		} else if (stats.player.race === 8) {
			iconRace = emojiUnd;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/UNDEAD_9.jpg";
		} else if (stats.player.race === 0) {
			iconRace = emojiRdm;
			avatar = "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/RANDOM_9.jpg";
		}
		let battleTag = stats.player.playerIds[0].battleTag;
		battleTag = battleTag.replace(/#/gi, "%23");

		if (avatar === " ") {
			let newEmbed = new Discord.MessageEmbed();

			newEmbed.setColor("#0099ff")
				.setTitle(stats.player.name)
				.setThumbnail("https://www.w3champions.com/img/all.d725e22d.png")
				.addField("Message", "You have to play 5 games, GL HF!")
				.addField("View profile in w3champions", `[Click here](https://www.w3champions.com/player/${battleTag})`);

			return message.channel.send(newEmbed);
		}

		embed.addField("Rank", stats.rankNumber, true);
		embed.addField("Mode", "1v1", true);
		embed.addField("League", leagueName, true);

		if (stats.player.race === 1) {
			race = "Human";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		} else if (stats.race === 2) {
			race = "Orc";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		} else if (stats.race === 4) {
			race = "Night";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		} else if (stats.race === 8) {
			race = "Undead";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		} else if (stats.race === 0) {
			race = "Random";
			embed.addFields(
				{
					name: race,
					value:
						stats.player.wins +
						" - " +
						stats.player.losses +
						"  (" +
						Math.round(stats.player.winrate * 100) +
						"%)",
					inline: true
				},
				{
					name: "Mmr",
					value: stats.player.mmr,
					inline: true
				},
				{
					name: "RP",
					value: stats.rankingPoints,
					inline: true
				}
			);
		}

		embed.setColor("#0099ff")
			.setTitle(stats.player.name + " " + iconRace)
			.setThumbnail(avatar)
			.addField("View profile in w3champions", `[Click here](https://www.w3champions.com/player/${battleTag})`);

		return message.channel.send(embed);
	} catch (error) {
		console.log(error);
		return message.channel.send("This player has not played 1v1 games this season.");
	}
};

const matchEmbed = (player, message) => {
	let embed = new Discord.MessageEmbed();

	embed.setColor("#0099ff")
		.setTitle("Game")
		.setThumbnail("https://www.w3champions.com/img/grandmaster.9613f56f.png")
		.addFields(
			{
				name: "Match",
				value: player.teams[0].players[0].battleTag + "  VS  " + player.teams[1].players[0].battleTag
			},
			{ name: "Map", value: player.map }
		);
	message.channel.send(embed);
};

const rankingEmbed = (ranking, message, img) => {
	let embed = new Discord.MessageEmbed();
	let embed2 = new Discord.MessageEmbed();
	let embed3 = new Discord.MessageEmbed();
	let embed4 = new Discord.MessageEmbed();

	embed.setColor("#0099ff")
		.setTitle("RANKING")
		.setThumbnail(img);

	ranking.map((player, i) => {
		if (i < 25) {
			embed.addFields({
				name: player.player1Id,
				value: "Rank: " + player.rankNumber,
				inline: true
			});
		} else {
			if (i < 50) {
				embed2.addFields({
					name: player.player1Id,
					value: "Rank: " + player.rankNumber,
					inline: true
				});
			} else {
				if (i < 75) {
					embed3.addFields({
						name: player.player1Id,
						value: "Rank: " + player.rankNumber,
						inline: true
					});
				} else {
					if (i < 100) {
						embed4.addFields({
							name: player.player1Id,
							value: "Rank: " + player.rankNumber,
							inline: true
						});
					}
				}
			}
		}
	});

	if (embed.fields.length !== 0) {
		message.channel.send(embed);
	}
	if (embed2.fields.length !== 0) {
		embed2.setColor("#0099ff");
		message.channel.send(embed2);
	}
	if (embed3.fields.length !== 0) {
		embed3.setColor("#0099ff");
		message.channel.send(embed3);
	}
	if (embed4.fields.length !== 0) {
		embed4.setColor("#0099ff");
		message.channel.send(embed4);
	}
};

const matchesEmbed = (matchesList, message) => {
	let embed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("MATCHES")
		.setThumbnail("https://www.w3champions.com/img/grandmaster.9613f56f.png");

	for (let i = 0; i < matchesList.matches.length; i++) {
		embed.addFields({
			name: "Match",
			value: matchesList.matches[i].teams[0].players[0].battleTag + " VS " + matchesList.matches[i].teams[1].players[0].battleTag
		});
	}
	message.channel.send(embed);
};

const helpEmbed = message => {
	let embed = new Discord.MessageEmbed();
	embed.setColor("#0099ff")
		.setTitle("Commands")
		.addFields(
			{
				name: "!profile or !stats name",
				value: "Example: !profile Grubby"
			},
			{
				name: "!vs name battleTag",
				value: "Example: !vs Grubby 1278"
			},
			{
				name: "!Ranking league server",
				value: "Example: !Ranking Grand Master Europe"
			},
			{
				name: "!Matches server",
				value: "Example: !Matches Europe"
			},
			{
				name: "!score playerOne vs playerTwo",
				value: "Example: !score grubby vs xlord"
			},
			{
				name: "!detail id",
				value: "Example: !detail 5fb02f27ef7438b9a522715b"
			},
			{
				name: "!statsbymode or !sbm name",
				value: "Example: !statsbymode grubby"
			},
			{
				name: "!statsbyrace or !sbr name",
				value: "Example: !statsbyrace grubby"
			},
			{
				name: "!matchhistory or !mh name",
				example: "!mh grubby"
			}
		);
	message.channel.send(embed);
};

module.exports = {
	playerEmbed,
	rankingEmbed,
	matchesEmbed,
	helpEmbed,
	matchEmbed,
	playerByName
};
