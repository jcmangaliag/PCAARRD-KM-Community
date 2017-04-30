import moment from 'moment';
import _ from 'lodash';
(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$stateParams', '$q', 'GroupService', 'PostService', 'UserService', 'ngToast'];

	function DashboardController ($scope, $stateParams, $q, GroupService, PostService, UserService, ngToast) {

		const TOP_COUNT = 5;

		$scope.loadAllData = () => {
			$q.all([
				GroupService.getAllGroups(),
				PostService.getAllPosts(),
				UserService.getAllUsers()
			]).then((results) => {
				$scope.groups = results[0];
				$scope.posts = results[1];
				$scope.users = results[2];
				
				$scope.computeAnalytics();
			}, (error) => {	// can't load all data
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: There is a problem with loading data!`
		    	});
			})
		}

		$scope.loadAllData();

		$scope.computeAnalytics = () => {
			$scope.computeTopActiveGroups();
			$scope.computeTrendingTopics();
			$scope.computeTopPopularGroups();
			$scope.computeGroupsDistribution();
		}

		$scope.computeTopActiveGroups = () => {
			$scope.loadTopActiveGroups();
		}

		$scope.computeTrendingTopics = () => {
			$scope.loadTrendingTopics();
		}

		$scope.computeTopPopularGroups = () => {
			$scope.loadTopPopularGroups();
		}

		$scope.computeGroupsDistribution = () => {
			$scope.loadGroupsDistribution();
		}


			/*$scope.groups = GroupService.getGroupList();
			const top5ActiveGroups = $scope.groups.contents.sort(function(group1, group2) { 
						return group2.postsCount.total - group1.postsCount.total; })
					.slice(0, TOP_COUNT);	// temporary
				// top5ActiveGroups should scan posts and get the total for that month
			top5ActiveGroupsSeries*/
		$scope.loadTopActiveGroups = () => {
			Highcharts.chart('top-active-groups-container', {
			    title: {
			    	text: `Top 5 Active Groups Per Month for ${moment().year()}`
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
	               	 categories: moment.monthsShort().slice(0, moment().month()+1)
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
		}

		$scope.loadTrendingTopics = () => {	
		    Highcharts.chart('trending-topics-container', {
			    series: [{
			        type: "treemap",
			        layoutAlgorithm: 'stripes',
			        alternateStartingDirection: true,
			        levels: [{
			            level: 1,
			            layoutAlgorithm: 'sliceAndDice',
			            dataLabels: {
			                enabled: true,
			                align: 'left',
			                verticalAlign: 'top',
			                style: {
			                    fontSize: '15px',
			                    fontWeight: 'bold'
			                }
			            }
			        }],
			        data: [{
			            name: '#bananapestseminar',
						color: '#fa7272',
			            value: 57342
			        },{
			            name: '#coconutjuicePromo',
						color: '#f7a35c',
			            value: 22563
			        }, {
			            name: '#bananaDisease',
			            color: '#FFFF67',
			            value: 3512
			        }, {
			            name: '#bananakeychain',
						color: '#30b772',
			            value: 1003
			        }, {
			            name: '#biodiversitySessions',
						color: '#307fb7',
			            value: 3952
			        }, {
			            name: '#abacainflation',
						color: 'violet',
			            value: 4563
			        }, {
			            name: '#mango',
						color: 'gray',
			            value: 3342
			        }, {
			            name: '#bananacommunity',
						color: '#A3DAF5',
			            value: 1032
			        }, {
			            name: '#textCoconut',
						color: 'pink',
			            value: 1933
			        }, {
			            name: '#freeBiodiversityFreebies',
						color: '#B24DA1',
			            value: 1001
			        }]
			    }],
			    title: {
			        text: 'Trending Topics'
			    }
			});
		}


		$scope.loadTopPopularGroups = () => {
			Highcharts.chart('top-popular-groups-container', {
			    chart: {
			        type: 'column'
			    },
			    title: {
			        text: 'Top 5 Popular Groups by Age Group'
			    },
			    subtitle: {
			        text: 'Source: PCAARRD KM Community'
			    },
			    xAxis: {
			        type: 'category',
			        title: {
			        	text: 'Groups'
			        }
			    },
			    yAxis: {
			        title: {
			            text: 'Number of Members'
			        }

			    },
			    legend: {
			        enabled: false
			    },
			    plotOptions: {
			        series: {
			            borderWidth: 0,
			            dataLabels: {
			                enabled: true,
			                format: '{point.y:.1f}%'
			            }
			        }
			    },

			    tooltip: {
			        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
			    },

			    series: [{
			        name: 'Groups',
			        colorByPoint: true,
			        data: [{
			            name: 'Banana',
			            y: 56.33,
			            drilldown: 'Banana'
			        }, {
			            name: 'Biodiversity',
			            y: 24.03,
			            drilldown: 'Biodiversity'
			        }, {
			            name: 'Milkfish',
			            y: 10.38,
			            drilldown: 'Milkfish'
			        }, {
			            name: 'Coconut',
			            y: 4.77,
			            drilldown: 'Coconut'
			        }, {
			            name: 'Peanut',
			            y: 0.91,
			            drilldown: 'Peanut'
			        }]
			    }],
			    drilldown: {
			        series: [{
			            name: 'Banana',
			            id: 'Banana',
			            data: [
			                [
			                    'Ages 0 - 17',
			                    17.2
			                ],
			                [
			                    'Ages 18 - 29',
			                    24.13
			                ],
			                [
			                    'Ages 30 - 49',
			                    8.61
			                ],
			                [
			                    'Ages 50 - 64',
			                    5.33
			                ],
			                [
			                    'Ages 65+',
			                    1.06
			                ]
			            ]
			        }, {
			            name: 'Biodiversity',
			            id: 'Biodiversity',
			            data: [
			                [
			                    'Ages 0 - 17',
			                    17.2
			                ],
			                [
			                    'Ages 18 - 29',
			                    24.13
			                ],
			                [
			                    'Ages 30 - 49',
			                    8.61
			                ],
			                [
			                    'Ages 50 - 64',
			                    5.33
			                ],
			                [
			                    'Ages 65+',
			                    1.06
			                ]
			            ]
			        }, {
			            name: 'Milkfish',
			            id: 'Milkfish',
			            data: [
			                [
			                    'Ages 0 - 17',
			                    17.2
			                ],
			                [
			                    'Ages 18 - 29',
			                    24.13
			                ],
			                [
			                    'Ages 30 - 49',
			                    8.61
			                ],
			                [
			                    'Ages 50 - 64',
			                    5.33
			                ],
			                [
			                    'Ages 65+',
			                    1.06
			                ]
			            ]
			        }, {
			            name: 'Coconut',
			            id: 'Coconut',
			            data: [
			                [
			                    'Ages 0 - 17',
			                    17.2
			                ],
			                [
			                    'Ages 18 - 29',
			                    24.13
			                ],
			                [
			                    'Ages 30 - 49',
			                    8.61
			                ],
			                [
			                    'Ages 50 - 64',
			                    5.33
			                ],
			                [
			                    'Ages 65+',
			                    1.06
			                ]
			            ]
			        }, {
			            name: 'Peanut',
			            id: 'Peanut',
			            data: [
			                [
			                    'Ages 0 - 17',
			                    17.2
			                ],
			                [
			                    'Ages 18 - 29',
			                    24.13
			                ],
			                [
			                    'Ages 30 - 49',
			                    8.61
			                ],
			                [
			                    'Ages 50 - 64',
			                    5.33
			                ],
			                [
			                    'Ages 65+',
			                    1.06
			                ]
			            ]
			        }]
			    }
			});
		}

		$scope.loadGroupsDistribution = () => {
			Highcharts.chart('groups-distribution-container', {
			    chart: {
			        type: 'pie'
			    },
			    title: {
			        text: 'Groups Distribution'
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
	

	}

})();