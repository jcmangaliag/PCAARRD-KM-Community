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
			/** Getting the top active groups of current month **/

			// retrieve all posts of the current month and year
			let currentMonthPosts = $scope.posts.filter((post) =>
				(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('M') == moment().month()+1) && 
				(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('YYYY') == moment().year())
			);
			
			// create object containing group handles as key and the value is the count of posts from the currentMonthPosts
			let postsGroupsWithCount = {};
			_.forEach(currentMonthPosts, (post) => {
				if (postsGroupsWithCount.hasOwnProperty(post.groupBelonged)){
					postsGroupsWithCount[post.groupBelonged]++;
				} else {
					postsGroupsWithCount[post.groupBelonged] = 1;
				}
			});

			// create an array containing the groups sorted by post counts in reverse
			let sortedGroupsArray =  _(postsGroupsWithCount).keys().sort((key1, key2) => postsGroupsWithCount[key2] - postsGroupsWithCount[key1]).map((key) => {
				return key;
			}).value();
			
			// limit the array size to at most 5
			const topActiveGroupsSize = sortedGroupsArray.length < 5? sortedGroupsArray.length : 5;
			sortedGroupsArray = sortedGroupsArray.slice(0, topActiveGroupsSize);
			

			/** Getting the count of posts of the top active groups for the previous months of the current year **/

			// in each group in the top active, retrieve the count of posts for the months of this year
			const consideredMonths = moment.months().slice(0, moment().month()+1);
			let topActiveGroups = [];

			_.forEach(sortedGroupsArray, (group) => {
				let groupPostsCountList = [];

				_.forEach(consideredMonths, (month) => {

					const postsCount = $scope.posts.filter((post) => 
						(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('MMMM') == month) && 
						(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('YYYY') == moment().year()) &&
						(post.groupBelonged === group)
					).length;

					groupPostsCountList.push(postsCount);
				});

				topActiveGroups.push({name: group, data: groupPostsCountList});
			});

			$scope.loadTopActiveGroups(topActiveGroups);
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
		$scope.loadTopActiveGroups = (topActiveGroups) => {
			Highcharts.chart('top-active-groups-container', {
			    title: {
			    	text: `Top Active Groups Per Month for ${moment().year()}`
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
			    series: topActiveGroups
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
			        text: 'Top Popular Groups by Age Group'
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