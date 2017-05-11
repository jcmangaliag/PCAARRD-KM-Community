'use strict';

var _angularUiRouter = require('angular-ui-router/release/angular-ui-router.min');

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _highstock = require('highcharts/highstock');

var _highstock2 = _interopRequireDefault(_highstock);

var _exporting = require('highcharts/modules/exporting');

var _exporting2 = _interopRequireDefault(_exporting);

var _drilldown = require('highcharts/modules/drilldown');

var _drilldown2 = _interopRequireDefault(_drilldown);

var _treemap = require('highcharts/modules/treemap');

var _treemap2 = _interopRequireDefault(_treemap);

var _highchartsMore = require('highcharts/highcharts-more');

var _highchartsMore2 = _interopRequireDefault(_highchartsMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _exporting2.default)(_highstock2.default);
(0, _drilldown2.default)(_highstock2.default);
(0, _treemap2.default)(_highstock2.default);
(0, _highchartsMore2.default)(_highstock2.default);

window.Highcharts = _highstock2.default;

(function () {
	'use strict';

	angular.module('groups', ['posts', _angularUiRouter2.default]);
})();