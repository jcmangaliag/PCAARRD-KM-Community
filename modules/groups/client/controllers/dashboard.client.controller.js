import moment from 'moment';
import _ from 'lodash';
(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$q', 'GroupService', 'PostService'];

	function DashboardController ($scope, $q, GroupService, PostService) {

		const TOP_COUNT = 5;

		GroupService.getAllGroups()
		.then((results) => {
			return 1 //PostService.get
		}, (error) => {
			return $q.reject(error);
		})
		.then((results) => {
			/*$scope.groups = GroupService.getGroupList();
			const top5ActiveGroups = $scope.groups.contents.sort(function(group1, group2) { 
						return group2.postsCount.total - group1.postsCount.total; })
					.slice(0, TOP_COUNT);	// temporary
				// top5ActiveGroups should scan posts and get the total for that month
			top5ActiveGroupsSeries*/
		});
		

	    Highcharts.chart('monthly-posts-container', {
		    title: {
		    	text: `Monthly Posts of the Top 5 Active Groups, ${moment().year()}`
		    },
		    subtitle: {
		    	text: 'Source: PCAARRD KM Community'
		    },
		    yAxis: {
	             title: {
                     text: 'Number of Posts'
	             }
		    },
		    xAxis: {
                 title: {
                     text: 'Month'
               	 }, 
               	 categories: moment.monthsShort()
		    },
		    legend: {
               layout: 'vertical',
               align: 'right',
               verticalAlign: 'middle'
		    },
		    series: [{
		    name: 'Banana',
		    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
		    }, {
		    name: 'Coconut',
		    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
		    }, {
		    name: 'Mangrove Crabbers',
		    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
		    }, {
		    name: 'Biodiversity',
		    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
		    }, {
		    name: 'Abaca',
		    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
		    }]
	    });


	    Highcharts.chart('popular-groups-container', {
		    chart: {
		        type: 'bar'
		    },
		    title: {
		        text: 'Members of the Top 5 Popular Groups by Age Group'
		    },
		    subtitle: {
		        text: 'PCAARRD KM Community'
		    },
		    xAxis: {
		        categories: ['Banana', 'Biodiversity', 'Milkfish', 'Coconut', 'Peanut'],
		        title: {
		            text: 'Groups'
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Number of Members',
		            align: 'high'
		        },
		        labels: {
		            overflow: 'justify'
		        }
		    },
		    plotOptions: {
		        bar: {
		            dataLabels: {
		                enabled: true
		            }
		        }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'top',
		        x: -40,
		        y: 80,
		        floating: true,
		        borderWidth: 1,
		        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		        shadow: true
		    },
		    credits: {
		        enabled: false
		    },
		    series: [{
		        name: 'Ages 0 - 17',
		        data: [107, 312, 635, 203, 92]
		    }, {
		        name: 'Ages 18 - 29',
		        data: [1030, 756, 489, 408, 36]
		    }, {
		        name: 'Ages 30 - 49',
		        data: [1022, 954, 250, 740, 438]
		    }, {
		        name: 'Ages 50 - 64',
		        data: [1001, 756, 1747, 408, 126]
		    }, {
		        name: 'Ages 65+',
		        data: [201, 127, 43, 72, 11]
		    }]
		});



		Highcharts.chart('groups-distribution-container', {
		    chart: {
		        type: 'pie'
		    },
		    title: {
		        text: 'Browser market shares. January, 2015 to May, 2015'
		    },
		    subtitle: {
		        text: 'Click the slices to view versions. Source: netmarketshare.com.'
		    },
		    plotOptions: {
		        series: {
		            dataLabels: {
		                enabled: true,
		                format: '{point.name}: {point.y:.1f}%'
		            }
		        }
		    },

		    tooltip: {
		        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
		    },
		    series: [{
		        name: 'Brands',
		        colorByPoint: true,
		        data: [{
		            name: 'Microsoft Internet Explorer',
		            y: 56.33,
		            drilldown: 'Microsoft Internet Explorer'
		        }, {
		            name: 'Chrome',
		            y: 24.03,
		            drilldown: 'Chrome'
		        }, {
		            name: 'Firefox',
		            y: 10.38,
		            drilldown: 'Firefox'
		        }, {
		            name: 'Safari',
		            y: 4.77,
		            drilldown: 'Safari'
		        }, {
		            name: 'Opera',
		            y: 0.91,
		            drilldown: 'Opera'
		        }, {
		            name: 'Proprietary or Undetectable',
		            y: 0.2,
		            drilldown: null
		        }]
		    }],
		    drilldown: {
		        series: [{
		            name: 'Microsoft Internet Explorer',
		            id: 'Microsoft Internet Explorer',
		            data: [
		                ['v11.0', 24.13],
		                ['v8.0', 17.2],
		                ['v9.0', 8.11],
		                ['v10.0', 5.33],
		                ['v6.0', 1.06],
		                ['v7.0', 0.5]
		            ]
		        }, {
		            name: 'Chrome',
		            id: 'Chrome',
		            data: [
		                ['v40.0', 5],
		                ['v41.0', 4.32],
		                ['v42.0', 3.68],
		                ['v39.0', 2.96],
		                ['v36.0', 2.53],
		                ['v43.0', 1.45],
		                ['v31.0', 1.24],
		                ['v35.0', 0.85],
		                ['v38.0', 0.6],
		                ['v32.0', 0.55],
		                ['v37.0', 0.38],
		                ['v33.0', 0.19],
		                ['v34.0', 0.14],
		                ['v30.0', 0.14]
		            ]
		        }, {
		            name: 'Firefox',
		            id: 'Firefox',
		            data: [
		                ['v35', 2.76],
		                ['v36', 2.32],
		                ['v37', 2.31],
		                ['v34', 1.27],
		                ['v38', 1.02],
		                ['v31', 0.33],
		                ['v33', 0.22],
		                ['v32', 0.15]
		            ]
		        }, {
		            name: 'Safari',
		            id: 'Safari',
		            data: [
		                ['v8.0', 2.56],
		                ['v7.1', 0.77],
		                ['v5.1', 0.42],
		                ['v5.0', 0.3],
		                ['v6.1', 0.29],
		                ['v7.0', 0.26],
		                ['v6.2', 0.17]
		            ]
		        }, {
		            name: 'Opera',
		            id: 'Opera',
		            data: [
		                ['v12.x', 0.34],
		                ['v28', 0.24],
		                ['v27', 0.17],
		                ['v29', 0.16]
		            ]
		        }]
		    }
		});

	}

})();