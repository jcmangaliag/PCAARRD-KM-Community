import moment from 'moment';
import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$stateParams', '$q', 'GroupService', 'PostService', 'UserService', 'ngToast', 'SharedPaginationService', '$filter'];

	function DashboardController ($scope, $stateParams, $q, GroupService, PostService, UserService, ngToast, SharedPaginationService, $filter) {

		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.groupsPerPage = 10;
		$scope.sortGroupBy = ['name'];
		$scope.sortReverse = false;
		$scope.trendingTopics = { selectedMonth: moment().format('MMMM'), selectedYear: moment().format('YYYY')};
		$scope.activeGroups = { startMonth: moment.months()[0], startYear: moment().format('YYYY'), endMonth: moment().format('MMMM'), endYear: moment().format('YYYY')};

		$scope.changeSort = (groupFields) => {
			$scope.sortReverse = (_.isEqual($scope.sortGroupBy, groupFields))? !$scope.sortReverse : true;
			$scope.sortGroupBy = groupFields;
		} 

		$scope.$watch('searchGroupsStatisticsValue', function(value){ 
			if ($scope.groups){
				$scope.groups = $filter('filter')($scope.groupsCopy, value);
				$scope.paginate.currentPage = 1;
			}
    	});

		$scope.loadAllData = () => {
			$q.all([	// parallel data loading
				GroupService.getAllGroups(),
				PostService.getAllPosts(),
				UserService.getAllUsers()
			]).then((results) => {
				$scope.groups = results[0];
				$scope.groupsCopy = _.toArray(results[0]);
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

		$scope.getAllMonths = () => {
			return moment.months();
		}

		$scope.getAllYears = () => {
			let years = [];
			for (let i = moment().get('year'); i > 2015; i--){
				years.push(i);
			}
			return years;
		}

		$scope.computeAnalytics = () => {
			$scope.computeTopActiveGroups($scope.activeGroups.startMonth, $scope.activeGroups.startYear, $scope.activeGroups.endMonth, $scope.activeGroups.endYear);
			$scope.computeTrendingTopics($scope.trendingTopics.selectedMonth, $scope.trendingTopics.selectedYear);
			$scope.computeTopPopularGroups();
			$scope.computeGroupsDistribution();
		}

		$scope.validStartEndDate = (startMonth, startYear, endMonth, endYear) => {
			return moment(`${startMonth} ${startYear}`, 'MMMM YYYY') <= moment(`${endMonth} ${endYear}`, 'MMMM YYYY');
		}

		$scope.retrieveGroupName = (groupHandle) => {
			const groupIndex = $scope.groups.map((group) => group.handle).indexOf(groupHandle);
			return $scope.groups[groupIndex].name;
		}

		$scope.retrievePostsOnDateInterval = (startMonth, startYear, endMonth, endYear) => {
			const startDate = moment(`${startMonth} ${startYear}`, 'MMMM YYYY');
			const endDate = moment(`${endMonth} ${endYear}`, 'MMMM YYYY');
			
			return $scope.posts.filter((post) =>
				moment(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('MMMM YYYY'), 'MMMM YYYY').isBetween(startDate, endDate, null, '[]')
			);
		}

		$scope.retrievePostsOnSelectedDate = (selectedMonth, selectedYear) => {
			return $scope.posts.filter((post) =>
				(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('MMMM') == selectedMonth) && 
				(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('YYYY') == selectedYear)
			);
		}

		$scope.retrieveUserAge = (user) => {
			return moment().diff(moment(user.birthdate, 'MMMM D YYYY'), 'years');
		}

		$scope.computeTopActiveGroups = (startMonth, startYear, endMonth, endYear) => {

			/** Getting the top active groups in the date interval **/

			if (!$scope.validStartEndDate(startMonth, startYear, endMonth, endYear)){
				ngToast.create({
		    		className: 'warning',
		    		content: `The start date should be earlier than end date.`
		    	});
		    	return;
			}

			// retrieve all posts in the date interval
			let selectedMonthPosts = $scope.retrievePostsOnDateInterval(startMonth, startYear, endMonth, endYear);
			
			// create object containing group handles as key and the value is the count of posts from the selectedMonthPosts
			let postsGroupsWithCount = {};
			_.forEach(selectedMonthPosts, (post) => {
				if (postsGroupsWithCount.hasOwnProperty(post.groupBelonged)){
					postsGroupsWithCount[post.groupBelonged]++;
				} else {
					postsGroupsWithCount[post.groupBelonged] = 1;
				}
			});

			// create an array containing the groups sorted by post counts in reverse and limits up to topActiveGroupsSize
			const topActiveGroupsSize = Object.keys(postsGroupsWithCount).length < 5? Object.keys(postsGroupsWithCount).length : 5;
			let sortedGroupsArray =  _(postsGroupsWithCount).keys().sort((key1, key2) => postsGroupsWithCount[key2] - postsGroupsWithCount[key1]).map((key) => {
				return key;
			}).value().slice(0, topActiveGroupsSize);
			

			/** Getting the count of posts of the top active groups in the date interval **/

			let betweenDates = [];
			let pointedDate = moment(`${startMonth} ${startYear}`, 'MMM YYYY');	// iterated date
			const endDate = moment(`${endMonth} ${endYear}`, 'MMM YYYY');
			let topActiveGroups = [];

			while (endDate >= pointedDate){
				betweenDates.push(pointedDate.format("MMM YYYY"));
				pointedDate.add(1, 'month');
			}

			// in each group in the top active, retrieve the count of posts for the months of date interval
			// then add to the groupPostsCountList the number of posts in every month
			_.forEach(sortedGroupsArray, (group) => {
				let groupPostsCountList = [];	// storage of post counts in different months

				_.forEach(betweenDates, (betweenDate) => {
					const selectedMonth = moment(betweenDate, 'MMM YYYY').format('MMM');
					const selectedYear = moment(betweenDate, 'MMM YYYY').format('YYYY');

					const postsCount = $scope.posts.filter((post) => 
						(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('MMM') == selectedMonth) && 
						(moment(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('YYYY') == selectedYear) &&
						(post.groupBelonged === group)
					).length;	

					groupPostsCountList.push(postsCount);
				});
				// add to the topActiveGroups list the group name and the array of posts count
				topActiveGroups.push({name: $scope.retrieveGroupName(group), data: groupPostsCountList});
			});

			/** Render the data to Top Active Groups Highchart **/
			$scope.loadTopActiveGroups(topActiveGroups, startMonth, startYear, endMonth, endYear, betweenDates);
		}

		$scope.computeTrendingTopics = (selectedMonth, selectedYear) => {
			// retrieve all posts of the selected month and year
			let selectedMonthPosts = $scope.retrievePostsOnSelectedDate(selectedMonth, selectedYear);

			// create object containing hashtags as key and the value is its count
			let hashtagsWithCount = {};
			_.forEach(selectedMonthPosts, (post) => {
				_.forEach(post.hashtags, (hashtag) => {
					const formattedHashtag = hashtag.toLowerCase();
					if (hashtagsWithCount.hasOwnProperty(formattedHashtag)){
						hashtagsWithCount[formattedHashtag]++;
					} else {
						hashtagsWithCount[formattedHashtag] = 1;
					}
				})
			});

			// create an array containing the hashtags, color, value sorted by hashtags count in reverse
			const trendingTopicsSize = Object.keys(hashtagsWithCount).length < 10? Object.keys(hashtagsWithCount).length : 10; 
			let colorList = ['#fa7272', '#f7a35c', '#FFFF67', '#30b772', '#307fb7', 'violet', 'gray', '#A3DAF5', 'pink', '#B24DA1'];
			
			let trendingTopics =  _(hashtagsWithCount).keys().sort((key1, key2) => hashtagsWithCount[key2] - hashtagsWithCount[key1]).map((key) => {
				let hashtagObject = {};
				let randomIndex = Math.floor(Math.random() * colorList.length);	// randomize the color

				hashtagObject.name = `#${key}`;
				hashtagObject.color = colorList[randomIndex];
				hashtagObject.value = hashtagsWithCount[key];

				colorList.splice(randomIndex, 1);
				return hashtagObject;
			}).value().splice(0, trendingTopicsSize);


			/** Render the data to Trending Topics Highchart **/
			$scope.loadTrendingTopics(trendingTopics, selectedMonth, selectedYear);
		}

		$scope.computeTopPopularGroups = () => {
			// create object containing group as key and the value is the number of members
			let groupsWithMembersCount = {};
			_.forEach($scope.users, (user) => {
				_.forEach(user.groupsJoined, (group) => {
					if (groupsWithMembersCount.hasOwnProperty(group)){
						groupsWithMembersCount[group]++;
					} else {
						groupsWithMembersCount[group] = 1;
					}
				});
			});

			// create an array containing groups, members count, drilldown name sorted by members count in reverse
			const topPopularGroupsSize = Object.keys(groupsWithMembersCount).length < 5? Object.keys(groupsWithMembersCount).length : 5; 
			let popularGroupList = [];	// contains group handles of the top popular groups
			let topPopularGroups =  _(groupsWithMembersCount).keys().sort((key1, key2) => groupsWithMembersCount[key2] - groupsWithMembersCount[key1]).map((key) => {
				const groupName = $scope.retrieveGroupName(key);
				popularGroupList.push(key);

				return {
					name: groupName,
					y: groupsWithMembersCount[key],
					drilldown: key
				}
			}).value().splice(0, topPopularGroupsSize);
			popularGroupList = popularGroupList.slice(0, topPopularGroupsSize);

			// find the members of the group and categorize them by their ages
			let topPopularGroupsWithAges = [];	// contains the drilldown series of highchart
			for (let i = 0; i < topPopularGroupsSize; i++){
				let topPopularGroupsAgesList = [	// contains the age statistics of the group
					['Ages 0 - 17', 0],
					['Ages 18 - 29', 0],
					['Ages 30 - 49', 0],
					['Ages 50 - 64', 0],
					['Ages 65+', 0],
				];

				_.forEach($scope.users, (user) => {	// checking if each user is a member of the group
					if (user.groupsJoined.indexOf(popularGroupList[i]) > -1){
						const userAge = $scope.retrieveUserAge(user);

						if (userAge < 18){
							topPopularGroupsAgesList[0][1]++;
						} else if (userAge < 30) {
							topPopularGroupsAgesList[1][1]++;
						} else if (userAge < 50) {
							topPopularGroupsAgesList[2][1]++;
						} else if (userAge < 65) {
							topPopularGroupsAgesList[3][1]++;
						} else {
							topPopularGroupsAgesList[4][1]++;
						}
					}
				});

				topPopularGroupsWithAges.push({
					name: topPopularGroups[i].name,
					id: topPopularGroups[i].drilldown,
					data: topPopularGroupsAgesList
				});
			}


			/** Render the data to Top Popular Groups Highchart **/
			$scope.loadTopPopularGroups(topPopularGroups, topPopularGroupsWithAges);
		}

		$scope.computeGroupsDistribution = () => {
			const totalGroups = $scope.groups.length;
			let groupIndustriesData = [];
			let groupsDistributionSeries = [];
			
			const industries = [...new Set($scope.groups.map((group) => group.classification.industry))];	// array of distinct industries
			
			_.forEach(industries, (industry) => {
				// groups under the industry
				let industryGroups = $scope.groups.filter((group) => group.classification.industry === industry);
				let industryPercent = (industryGroups.length / totalGroups) * 100;
				groupIndustriesData.push({name: industry, y: industryPercent, drilldown: industry});


				let sectors = [...new Set(industryGroups.map((group) => group.classification.sector))];
				let groupsDistributionSectorData = [];
				_.forEach(sectors, (sector) => {	
					// groups under the sector
					let sectorGroups = industryGroups.filter((group) => group.classification.sector === sector);
					let sectorPercent = (sectorGroups.length / totalGroups) * 100;
					groupsDistributionSectorData.push({name: sector, y: sectorPercent, drilldown: sector});
					

					let isps = [...new Set(sectorGroups.map((group) => group.classification.isp))];
					let groupsDistributionISPData = [];
					_.forEach(isps, (isp) => {	
						// groups under the isp
						let ispGroups = sectorGroups.filter((group) => group.classification.isp === isp);
						let ispPercent = (ispGroups.length / totalGroups) * 100;
						let ispObject = {name: isp, y: ispPercent};

						if (ispGroups[0].classification.specificCommodity){	// only applicable to groups with specific commodity
							ispObject.drilldown = isp;

							let specificCommodities = [...new Set(ispGroups.map((group) => group.classification.specificCommodity))];
							let groupsDistributionSpecificCommodityData = [];
							_.forEach(specificCommodities, (specificCommodity) => {	
								// groups under the specific commodity
								let specificCommodityGroups = ispGroups.filter((group) => group.classification.specificCommodity === specificCommodity);
								let specificCommodityPercent = (specificCommodityGroups.length / totalGroups) * 100;
								groupsDistributionSpecificCommodityData.push({name: specificCommodity, y: specificCommodityPercent});
							});

							groupsDistributionSeries.push({
								name: 'Specific Commodity',
								id: isp,
								data: groupsDistributionSpecificCommodityData
							});
						}
						groupsDistributionISPData.push(ispObject);
					});

					groupsDistributionSeries.push({
						name: 'ISP',
						id: sector,
						data: groupsDistributionISPData
					});
				});

				groupsDistributionSeries.push({
					name: 'Sector',
					id: industry,
					data: groupsDistributionSectorData
				});
			});


			/** Render the data to Groups Distribution Highchart **/
			$scope.loadGroupsDistribution(groupIndustriesData, groupsDistributionSeries);
		}

		$scope.loadTopActiveGroups = (topActiveGroups, startMonth, startYear, endMonth, endYear, monthsList) => {
			Highcharts.chart('top-active-groups-container', {
			    title: {
			    	text: `Top Active Groups from ${startMonth} ${startYear} to ${endMonth} ${endYear}`
			    },
			    subtitle: {
			    	text: 'Source: PCAARRD KM Community'
			    },
			    yAxis: {
					allowDecimals: false,
					title: {
					 	text: 'Number of Posts'
					}
			    },
			    xAxis: {
	                 title: {
	                     text: 'Date'
	               	 }, 
	               	 categories: monthsList
			    },
			    legend: {
	               layout: 'vertical',
	               align: 'right',
	               verticalAlign: 'middle'
			    },
			    series: topActiveGroups,
			    tooltip: {
			         pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b> post/s<br/>'
			    },
		    });
		}

		$scope.loadTrendingTopics = (trendingTopics, selectedMonth, selectedYear) => {	
		    Highcharts.chart('trending-topics-container', {
		    	title: {
			        text: `Trending Topics in  ${selectedMonth}, ${selectedYear}`
			    }, 
			    subtitle: {
			    	text: 'Source: PCAARRD KM Community'
			    },
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
			        data: trendingTopics
			    }],
			    tooltip: {
			         pointFormat: '<b>{point.name}</b>: {point.value}</b> mention/s<br/>'
			    },
			});
		}


		$scope.loadTopPopularGroups = (topPopularGroups, topPopularGroupsWithAges) => {
			Highcharts.chart('top-popular-groups-container', {
			    chart: {
			        type: 'column'
			    },
			    title: {
			        text: 'Top Popular Groups by Age Group with Drill Down'
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
			    	allowDecimals: false,
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
			                format: '{point.y:f}'
			            }
			        }
			    },
			    tooltip: {
			        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f}</b> member/s<br/>'
			    },
			    series: [{
			        name: 'Groups',
			        colorByPoint: true,
			        data: topPopularGroups
			    }],
			    drilldown: {
			        series: topPopularGroupsWithAges
			    }
			});
		}

		$scope.loadGroupsDistribution = (groupIndustriesData, groupsDistributionSeries) => {
			Highcharts.chart('groups-distribution-container', {
			    chart: {
			        type: 'pie'
			    },
			    title: {
			        text: 'Groups Distribution with Drill Down'
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
				    data: groupIndustriesData
				}],
			    drilldown: {
			        series: groupsDistributionSeries
			    }
			});
		}
	}
})();