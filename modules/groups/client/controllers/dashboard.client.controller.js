import moment from 'moment';
import _ from 'lodash';
(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$stateParams', '$q', 'GroupService', 'PostService'];

	function DashboardController ($scope, $stateParams, $q, GroupService, PostService) {

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
		    	text: `Posts of the Monthly Top 5 Active Groups, ${moment().year()}`
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

	    Highcharts.chart('posts-distribution-container', {
		    chart: {
		        polar: true,
		        type: 'line'
		    },

		    title: {
		        text: 'Budget vs spending',
		    },

		    pane: {
		        size: '80%'
		    },

		    xAxis: {
		        categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
		                'Information Technology', 'Administration'],
		        tickmarkPlacement: 'on',
		        lineWidth: 0
		    },

		    yAxis: {
		        gridLineInterpolation: 'polygon',
		        lineWidth: 0,
		        min: 0
		    },

		    tooltip: {
		        shared: true,
		        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
		    },

		    legend: {
		        align: 'right',
		        verticalAlign: 'top',
		        y: 70,
		        layout: 'vertical'
		    },

		    series: [{
		        name: 'Allocated Budget',
		        data: [43000, 19000, 60000, 35000, 17000, 10000],
		        pointPlacement: 'on'
		    }, {
		        name: 'Actual Spending',
		        data: [50000, 39000, 42000, 31000, 26000, 14000],
		        pointPlacement: 'on'
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
		        text: 'Source: PCAARRD KM Community'
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
		        text: 'Groups Distribution by Classification'
		    },
		    subtitle: {
		        text: 'Source: PCAARRD KM Community'
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
		        name: 'Industry',
		        colorByPoint: true,
		        data: [{
		            name: 'Agriculture',
		            y: 62,
		            drilldown: 'Agriculture'
		        }, {
		            name: 'Aquatic Resources',
		            y: 25,
		            drilldown: 'Aquatic Resources'
		        }, {
		            name: 'Natural Resources',
		            y: 13,
		            drilldown: 'Natural Resources'
		        }]
		    }],
		    drilldown: {
		        series: [{
		            name: 'Sector',
		            id: 'Agriculture',
		            data: [
	                    {name: 'Crops', y: 48, drilldown: 'Crops'},
	                    {name: 'Livestock', y: 14}
		            ]
		        }, {
		            name: 'ISP',
		            id: 'Crops',
		            data: [
	                    {name: 'Abaca', y: 6},
	                    {name: 'Coconut', y: 9},
	                    {name: 'Coffee', y: 5},
	                    {name: 'Legume', y: 18, drilldown: 'Legume'},
	                    {name: 'Mango', y: 10}
		            ]
		        }, {
		            name: 'Specific Commodity',
		            id: 'Legume',
		            data: [
	                    {name: 'Mungbean', y: 12},
	                    {name: 'Peanut', y: 6}
		            ]
		        },



		           {
		            name: 'Sector',
		            id: 'Aquatic Resources',
		            data: [
		                ['Inland Aquatic', 11],
		                ['Marine Resources', 5],
		                ['Ocean Environment Services (OES)',9]
		            ]
		        }, {
		            name: 'Sector',
		            id: 'Natural Resources',
		            data: [
		                ['Forestry', 10],
		                ['Inland Environment Services (IES)', 3]
		            ]
		        }]
		    }
		});
	}

})();