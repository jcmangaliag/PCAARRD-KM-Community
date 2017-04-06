import uiRouter from 'angular-ui-router';
import font_awesome from "font-awesome-sass-loader";
import angularToast from 'ng-toast';
import angularSanitize from 'angular-sanitize';
import angularAnimate from 'angular-animate';
import ngFilesModel from 'ng-files-model';
import angularEmojiFilterHDStyle from 'angular-emoji-filter-hd/dist/emoji.min.css';
import angularEmojiFilterHDJS from 'angular-emoji-filter-hd/lib/emoji.js';
/*import ngEmoticonsCSS from 'ng-emoticons/src/ng-emoticons.css';
import ngEmoticonsJS from 'ng-emoticons/src/ng-emoticons.js';
import highlightJS from 'highlightjs/highlight.pack.min.js';
import highlightStyle from 'highlightjs/styles/atom-one-dark.css';*/

(function () {
	'use strict';

	angular.module('shared', [uiRouter, 'ngToast', 'ngAnimate', 'ngSanitize', 'ng-files-model', 'dbaq.emoji'/*'ngEmoticons'*/]);

})();