import uiRouter from 'angular-ui-router/release/angular-ui-router.min';
// highcharts for graphs and charts
import highCharts from 'highcharts/highstock';
import highChartsExporting from 'highcharts/modules/exporting';
import highChartsDrilldown from 'highcharts/modules/drilldown';
import highChartsTreeMap from 'highcharts/modules/treemap';
import highChartsMore from 'highcharts/highcharts-more';

highChartsExporting(highCharts);
highChartsDrilldown(highCharts);
highChartsTreeMap(highCharts);
highChartsMore(highCharts);

window.Highcharts = highCharts;

(function () {
	'use strict';

	angular.module('groups', ['posts', uiRouter]);

})();
