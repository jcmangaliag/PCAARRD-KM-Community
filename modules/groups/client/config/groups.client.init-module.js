import uiRouter from 'angular-ui-router';
let highCharts = require('highcharts');
require ('highcharts/modules/exporting')(highCharts);
require ('highcharts/modules/drilldown')(highCharts);
window.Highcharts = highCharts; 

(function () {
	'use strict';

	angular.module('groups', ['posts', uiRouter]);

})();