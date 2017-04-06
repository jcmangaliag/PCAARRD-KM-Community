import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('shared')
		.config(sharedEmoji);

	sharedEmoji.$inject = ['emojiConfigProvider'];

	function sharedEmoji (emojiConfigProvider) {

		const emojiList = [
			{ emoji: "smile", alias: ":)" },
			{ emoji: "grinning", alias: ":D" },
			{ emoji: "laughing", alias: "xD" },
			{ emoji: "frowning", alias: ":(" },
			{ emoji: "cry", alias: ":'(" },
			{ emoji: "joy", alias: ":')" },
			{ emoji: "open_mouth", alias: ":o" },
			{ emoji: "kissing_heart", alias: ":*" },
			{ emoji: "wink", alias: ";)" },
			{ emoji: "stuck_out_tongue", alias: ":p" },
			{ emoji: "expressionless", alias: ":|" },
			{ emoji: "blush", alias: ":$" },
			{ emoji: "innocent", alias: "O:)" },
			{ emoji: "imp", alias: ">:)" },
			{ emoji: "sunglasses", alias: "|-O" },
			{ emoji: "confused", alias: "%)" },
			{ emoji: "heart", alias: "<3" },
			{ emoji: "broken_heart", alias: "</3" },
			{ emoji: "thumbsup", alias: "(y)" },
			{ emoji: "ok_hand", alias: "+1" }

			/* 
	     		Please add more alias to other common emojis.
	     		Cheat sheet here: https://www.webpagefx.com/tools/emoji-cheat-sheet/
	     	*/
		]

		_.forEach(emojiList, (oneEmoji) => {
			emojiConfigProvider.addAlias(oneEmoji.emoji, oneEmoji.alias);
		})
	}

})();

