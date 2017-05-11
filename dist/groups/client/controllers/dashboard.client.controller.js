'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
	'use strict';

	angular.module('groups').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$stateParams', '$q', 'GroupService', 'PostService', 'UserService', 'ngToast', 'SharedPaginationService', '$filter'];

	function DashboardController($scope, $stateParams, $q, GroupService, PostService, UserService, ngToast, SharedPaginationService, $filter) {

		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.groupsPerPage = 10;
		$scope.sortGroupBy = ['name'];
		$scope.sortReverse = false;
		$scope.trendingTopics = { selectedMonth: (0, _moment2.default)().format('MMMM'), selectedYear: (0, _moment2.default)().format('YYYY') };
		$scope.activeGroups = { startMonth: _moment2.default.months()[0], startYear: (0, _moment2.default)().format('YYYY'), endMonth: (0, _moment2.default)().format('MMMM'), endYear: (0, _moment2.default)().format('YYYY') };

		$scope.changeSort = function (groupFields) {
			$scope.sortReverse = _lodash2.default.isEqual($scope.sortGroupBy, groupFields) ? !$scope.sortReverse : true;
			$scope.sortGroupBy = groupFields;
		};

		$scope.$watch('searchGroupsStatisticsValue', function (value) {
			if ($scope.groups) {
				$scope.groups = $filter('filter')($scope.groupsCopy, value);
				$scope.paginate.currentPage = 1;
			}
		});

		$scope.loadAllData = function () {
			$q.all([// parallel data loading
			GroupService.getAllGroups(), PostService.getAllPosts(), UserService.getAllUsers()]).then(function (results) {
				$scope.groups = results[0];
				$scope.groupsCopy = _lodash2.default.toArray(results[0]);
				$scope.posts = results[1];
				$scope.users = results[2];

				$scope.computeAnalytics();
			}, function (error) {
				// can't load all data
				ngToast.create({
					className: 'danger',
					content: 'Error: There is a problem with loading data!'
				});
			});
		};

		$scope.loadAllData();

		$scope.getAllMonths = function () {
			return _moment2.default.months();
		};

		$scope.getAllYears = function () {
			var years = [];
			for (var i = (0, _moment2.default)().get('year'); i > 2015; i--) {
				years.push(i);
			}
			return years;
		};

		$scope.computeAnalytics = function () {
			$scope.computeTopActiveGroups($scope.activeGroups.startMonth, $scope.activeGroups.startYear, $scope.activeGroups.endMonth, $scope.activeGroups.endYear);
			$scope.computeTrendingTopics($scope.trendingTopics.selectedMonth, $scope.trendingTopics.selectedYear);
			$scope.computeTopPopularGroups();
			$scope.computeGroupsDistribution();
		};

		$scope.validStartEndDate = function (startMonth, startYear, endMonth, endYear) {
			return (0, _moment2.default)(startMonth + ' ' + startYear, 'MMMM YYYY') <= (0, _moment2.default)(endMonth + ' ' + endYear, 'MMMM YYYY');
		};

		$scope.retrieveGroupName = function (groupHandle) {
			var groupIndex = $scope.groups.map(function (group) {
				return group.handle;
			}).indexOf(groupHandle);
			return $scope.groups[groupIndex].name;
		};

		$scope.retrievePostsOnDateInterval = function (startMonth, startYear, endMonth, endYear) {
			var startDate = (0, _moment2.default)(startMonth + ' ' + startYear, 'MMMM YYYY');
			var endDate = (0, _moment2.default)(endMonth + ' ' + endYear, 'MMMM YYYY');

			return $scope.posts.filter(function (post) {
				return (0, _moment2.default)((0, _moment2.default)(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('MMMM YYYY'), 'MMMM YYYY').isBetween(startDate, endDate, null, '[]');
			});
		};

		$scope.retrievePostsOnSelectedDate = function (selectedMonth, selectedYear) {
			return $scope.posts.filter(function (post) {
				return (0, _moment2.default)(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('MMMM') == selectedMonth && (0, _moment2.default)(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('YYYY') == selectedYear;
			});
		};

		$scope.retrieveUserAge = function (user) {
			return (0, _moment2.default)().diff((0, _moment2.default)(user.birthdate, 'MMMM D YYYY'), 'years');
		};

		$scope.computeTopActiveGroups = function (startMonth, startYear, endMonth, endYear) {

			/** Getting the top active groups in the date interval **/

			if (!$scope.validStartEndDate(startMonth, startYear, endMonth, endYear)) {
				ngToast.create({
					className: 'warning',
					content: 'The start date should be earlier than end date.'
				});
				return;
			}

			// retrieve all posts in the date interval
			var selectedMonthPosts = $scope.retrievePostsOnDateInterval(startMonth, startYear, endMonth, endYear);

			// create object containing group handles as key and the value is the count of posts from the selectedMonthPosts
			var postsGroupsWithCount = {};
			_lodash2.default.forEach(selectedMonthPosts, function (post) {
				if (postsGroupsWithCount.hasOwnProperty(post.groupBelonged)) {
					postsGroupsWithCount[post.groupBelonged]++;
				} else {
					postsGroupsWithCount[post.groupBelonged] = 1;
				}
			});

			// create an array containing the groups sorted by post counts in reverse and limits up to topActiveGroupsSize
			var topActiveGroupsSize = Object.keys(postsGroupsWithCount).length < 5 ? Object.keys(postsGroupsWithCount).length : 5;
			var sortedGroupsArray = (0, _lodash2.default)(postsGroupsWithCount).keys().sort(function (key1, key2) {
				return postsGroupsWithCount[key2] - postsGroupsWithCount[key1];
			}).map(function (key) {
				return key;
			}).value().slice(0, topActiveGroupsSize);

			/** Getting the count of posts of the top active groups in the date interval **/

			var betweenDates = [];
			var pointedDate = (0, _moment2.default)(startMonth + ' ' + startYear, 'MMM YYYY'); // iterated date
			var endDate = (0, _moment2.default)(endMonth + ' ' + endYear, 'MMM YYYY');
			var topActiveGroups = [];

			while (endDate >= pointedDate) {
				betweenDates.push(pointedDate.format("MMM YYYY"));
				pointedDate.add(1, 'month');
			}

			// in each group in the top active, retrieve the count of posts for the months of date interval
			// then add to the groupPostsCountList the number of posts in every month
			_lodash2.default.forEach(sortedGroupsArray, function (group) {
				var groupPostsCountList = []; // storage of post counts in different months

				_lodash2.default.forEach(betweenDates, function (betweenDate) {
					var selectedMonth = (0, _moment2.default)(betweenDate, 'MMM YYYY').format('MMM');
					var selectedYear = (0, _moment2.default)(betweenDate, 'MMM YYYY').format('YYYY');

					var postsCount = $scope.posts.filter(function (post) {
						return (0, _moment2.default)(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('MMM') == selectedMonth && (0, _moment2.default)(post.datePosted, 'MMMM Do YYYY, h:mm:ss a').format('YYYY') == selectedYear && post.groupBelonged === group;
					}).length;

					groupPostsCountList.push(postsCount);
				});
				// add to the topActiveGroups list the group name and the array of posts count
				topActiveGroups.push({ name: $scope.retrieveGroupName(group), data: groupPostsCountList });
			});

			/** Render the data to Top Active Groups Highchart **/
			$scope.loadTopActiveGroups(topActiveGroups, startMonth, startYear, endMonth, endYear, betweenDates);
		};

		$scope.computeTrendingTopics = function (selectedMonth, selectedYear) {
			// retrieve all posts of the selected month and year
			var selectedMonthPosts = $scope.retrievePostsOnSelectedDate(selectedMonth, selectedYear);

			// create object containing hashtags as key and the value is its count
			var hashtagsWithCount = {};
			_lodash2.default.forEach(selectedMonthPosts, function (post) {
				_lodash2.default.forEach(post.hashtags, function (hashtag) {
					var formattedHashtag = hashtag.toLowerCase();
					if (hashtagsWithCount.hasOwnProperty(formattedHashtag)) {
						hashtagsWithCount[formattedHashtag]++;
					} else {
						hashtagsWithCount[formattedHashtag] = 1;
					}
				});
			});

			// create an array containing the hashtags, color, value sorted by hashtags count in reverse
			var trendingTopicsSize = Object.keys(hashtagsWithCount).length < 10 ? Object.keys(hashtagsWithCount).length : 10;
			var colorList = ['#fa7272', '#f7a35c', '#FFFF67', '#30b772', '#307fb7', 'violet', 'gray', '#A3DAF5', 'pink', '#B24DA1'];

			var trendingTopics = (0, _lodash2.default)(hashtagsWithCount).keys().sort(function (key1, key2) {
				return hashtagsWithCount[key2] - hashtagsWithCount[key1];
			}).map(function (key) {
				var hashtagObject = {};
				var randomIndex = Math.floor(Math.random() * colorList.length); // randomize the color

				hashtagObject.name = '#' + key;
				hashtagObject.color = colorList[randomIndex];
				hashtagObject.value = hashtagsWithCount[key];

				colorList.splice(randomIndex, 1);
				return hashtagObject;
			}).value().splice(0, trendingTopicsSize);

			/** Render the data to Trending Topics Highchart **/
			$scope.loadTrendingTopics(trendingTopics, selectedMonth, selectedYear);
		};

		$scope.computeTopPopularGroups = function () {
			// create object containing group as key and the value is the number of members
			var groupsWithMembersCount = {};
			_lodash2.default.forEach($scope.users, function (user) {
				_lodash2.default.forEach(user.groupsJoined, function (group) {
					if (groupsWithMembersCount.hasOwnProperty(group)) {
						groupsWithMembersCount[group]++;
					} else {
						groupsWithMembersCount[group] = 1;
					}
				});
			});

			// create an array containing groups, members count, drilldown name sorted by members count in reverse
			var topPopularGroupsSize = Object.keys(groupsWithMembersCount).length < 5 ? Object.keys(groupsWithMembersCount).length : 5;
			var popularGroupList = []; // contains group handles of the top popular groups
			var topPopularGroups = (0, _lodash2.default)(groupsWithMembersCount).keys().sort(function (key1, key2) {
				return groupsWithMembersCount[key2] - groupsWithMembersCount[key1];
			}).map(function (key) {
				var groupName = $scope.retrieveGroupName(key);
				popularGroupList.push(key);

				return {
					name: groupName,
					y: groupsWithMembersCount[key],
					drilldown: key
				};
			}).value().splice(0, topPopularGroupsSize);
			popularGroupList = popularGroupList.slice(0, topPopularGroupsSize);

			// find the members of the group and categorize them by their ages
			var topPopularGroupsWithAges = []; // contains the drilldown series of highchart

			var _loop = function _loop(i) {
				var topPopularGroupsAgesList = [// contains the age statistics of the group
				['Ages 0 - 17', 0], ['Ages 18 - 29', 0], ['Ages 30 - 49', 0], ['Ages 50 - 64', 0], ['Ages 65+', 0]];

				_lodash2.default.forEach($scope.users, function (user) {
					// checking if each user is a member of the group
					if (user.groupsJoined.indexOf(popularGroupList[i]) > -1) {
						var userAge = $scope.retrieveUserAge(user);

						if (userAge < 18) {
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
			};

			for (var i = 0; i < topPopularGroupsSize; i++) {
				_loop(i);
			}

			/** Render the data to Top Popular Groups Highchart **/
			$scope.loadTopPopularGroups(topPopularGroups, topPopularGroupsWithAges);
		};

		$scope.computeGroupsDistribution = function () {
			var totalGroups = $scope.groups.length;
			var groupIndustriesData = [];
			var groupsDistributionSeries = [];

			var industries = [].concat(_toConsumableArray(new Set($scope.groups.map(function (group) {
				return group.classification.industry;
			})))); // array of distinct industries

			_lodash2.default.forEach(industries, function (industry) {
				// groups under the industry
				var industryGroups = $scope.groups.filter(function (group) {
					return group.classification.industry === industry;
				});
				var industryPercent = industryGroups.length / totalGroups * 100;
				groupIndustriesData.push({ name: industry, y: industryPercent, drilldown: industry });

				var sectors = [].concat(_toConsumableArray(new Set(industryGroups.map(function (group) {
					return group.classification.sector;
				}))));
				var groupsDistributionSectorData = [];
				_lodash2.default.forEach(sectors, function (sector) {
					// groups under the sector
					var sectorGroups = industryGroups.filter(function (group) {
						return group.classification.sector === sector;
					});
					var sectorPercent = sectorGroups.length / totalGroups * 100;
					groupsDistributionSectorData.push({ name: sector, y: sectorPercent, drilldown: sector });

					var isps = [].concat(_toConsumableArray(new Set(sectorGroups.map(function (group) {
						return group.classification.isp;
					}))));
					var groupsDistributionISPData = [];
					_lodash2.default.forEach(isps, function (isp) {
						// groups under the isp
						var ispGroups = sectorGroups.filter(function (group) {
							return group.classification.isp === isp;
						});
						var ispPercent = ispGroups.length / totalGroups * 100;
						var ispObject = { name: isp, y: ispPercent };

						if (ispGroups[0].classification.specificCommodity) {
							// only applicable to groups with specific commodity
							ispObject.drilldown = isp;

							var specificCommodities = [].concat(_toConsumableArray(new Set(ispGroups.map(function (group) {
								return group.classification.specificCommodity;
							}))));
							var groupsDistributionSpecificCommodityData = [];
							_lodash2.default.forEach(specificCommodities, function (specificCommodity) {
								// groups under the specific commodity
								var specificCommodityGroups = ispGroups.filter(function (group) {
									return group.classification.specificCommodity === specificCommodity;
								});
								var specificCommodityPercent = specificCommodityGroups.length / totalGroups * 100;
								groupsDistributionSpecificCommodityData.push({ name: specificCommodity, y: specificCommodityPercent });
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
		};

		$scope.loadTopActiveGroups = function (topActiveGroups, startMonth, startYear, endMonth, endYear, monthsList) {
			Highcharts.chart('top-active-groups-container', {
				title: {
					text: 'Top Active Groups from ' + startMonth + ' ' + startYear + ' to ' + endMonth + ' ' + endYear
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
				}
			});
		};

		$scope.loadTrendingTopics = function (trendingTopics, selectedMonth, selectedYear) {
			Highcharts.chart('trending-topics-container', {
				title: {
					text: 'Trending Topics in  ' + selectedMonth + ', ' + selectedYear
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
				}
			});
		};

		$scope.loadTopPopularGroups = function (topPopularGroups, topPopularGroupsWithAges) {
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
		};

		$scope.loadGroupsDistribution = function (groupIndustriesData, groupsDistributionSeries) {
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
		};
	}
})();