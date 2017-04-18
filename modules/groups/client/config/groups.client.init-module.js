import uiRouter from 'angular-ui-router';
let highCharts = require('highcharts/highstock');
require ('highcharts/modules/exporting')(highCharts);
require ('highcharts/modules/drilldown')(highCharts);
require ('highcharts/modules/treemap')(highCharts);
require('highcharts/highcharts-more')(highCharts);
window.Highcharts = highCharts; 

(function () {
	'use strict';

	angular.module('groups', ['posts', uiRouter]);

})();