import font_awesome from "font-awesome-sass-loader";
import ngToastJS from 'ng-toast/dist/ngToast.min';
import ngToastCSS from 'ng-toast/dist/ngToast.min.css';
import ngToastAnimationsCSS from 'ng-toast/dist/ngToast-animations.min.css';
import angularSanitize from 'angular-sanitize/angular-sanitize.min';
import angularAnimate from 'angular-animate/angular-animate.min';
import angularEmojiFilterHDStyle from 'angular-emoji-filter-hd/dist/emoji.min.css';
import angularEmojiFilterHDJS from 'angular-emoji-filter-hd/dist/emoji.min';
import angularUIRouterTitle from 'angular-ui-router-title/angular-ui-router-title.js';

(function () {
	'use strict';

	angular.module('shared', ['ngToast', 'ngAnimate', 'ngSanitize', 'dbaq.emoji', 'ui.router.title']);

})();