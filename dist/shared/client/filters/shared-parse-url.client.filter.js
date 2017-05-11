'use strict';

(function () {
	'use strict';

	angular.module('shared').filter('parseURL', parseURL);

	function parseURL() {
		// Code copied and modified from http://oskarhane.com/angular-js-filter-to-make-urls-in-text-clickable/
		var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
		var emails = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

		return function (text) {
			if (text && text.match(urls)) {
				text = text.replace(urls, "<a href=\"$1\" target=\"_blank\">$1</a>");
			}
			if (text && text.match(emails)) {
				text = text.replace(emails, "<a href=\"mailto:$1\">$1</a>");
			}

			return text;
		};
	}
})();