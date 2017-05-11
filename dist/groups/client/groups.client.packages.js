'use strict';

var _groupsClient = require('./config/groups.client.init-module');

var _groupsClient2 = _interopRequireDefault(_groupsClient);

var _groupsClient3 = require('./config/groups.client.routes');

var _groupsClient4 = _interopRequireDefault(_groupsClient3);

var _groupClient = require('./controllers/group.client.controller');

var _groupClient2 = _interopRequireDefault(_groupClient);

var _groupClassificationClient = require('./controllers/group-classification.client.controller');

var _groupClassificationClient2 = _interopRequireDefault(_groupClassificationClient);

var _viewGroupsCategoriesClientController = require('./controllers/view-groups-categories.client.controller.js');

var _viewGroupsCategoriesClientController2 = _interopRequireDefault(_viewGroupsCategoriesClientController);

var _dashboardClient = require('./controllers/dashboard.client.controller');

var _dashboardClient2 = _interopRequireDefault(_dashboardClient);

var _editSettingsGroupClient = require('./controllers/edit-settings-group.client.controller');

var _editSettingsGroupClient2 = _interopRequireDefault(_editSettingsGroupClient);

var _communityHomeClient = require('./controllers/community-home.client.controller');

var _communityHomeClient2 = _interopRequireDefault(_communityHomeClient);

var _groupClassificationsClient = require('./directives/group-classifications.client.directive');

var _groupClassificationsClient2 = _interopRequireDefault(_groupClassificationsClient);

var _addGroupClassificationClient = require('./directives/add-group-classification.client.directive');

var _addGroupClassificationClient2 = _interopRequireDefault(_addGroupClassificationClient);

var _viewGroupsCategoriesClient = require('./directives/view-groups-categories.client.directive');

var _viewGroupsCategoriesClient2 = _interopRequireDefault(_viewGroupsCategoriesClient);

var _viewGroupInfoPanelClient = require('./directives/view-group-info-panel.client.directive');

var _viewGroupInfoPanelClient2 = _interopRequireDefault(_viewGroupInfoPanelClient);

var _viewManageGroupPanelClient = require('./directives/view-manage-group-panel.client.directive');

var _viewManageGroupPanelClient2 = _interopRequireDefault(_viewManageGroupPanelClient);

var _viewGroupMembersPanelClient = require('./directives/view-group-members-panel.client.directive');

var _viewGroupMembersPanelClient2 = _interopRequireDefault(_viewGroupMembersPanelClient);

var _viewGroupPostsStatisticsPanelClient = require('./directives/view-group-posts-statistics-panel.client.directive');

var _viewGroupPostsStatisticsPanelClient2 = _interopRequireDefault(_viewGroupPostsStatisticsPanelClient);

var _viewGroupJoinInvitationClient = require('./directives/view-group-join-invitation.client.directive');

var _viewGroupJoinInvitationClient2 = _interopRequireDefault(_viewGroupJoinInvitationClient);

var _communityLandingPageClient = require('./directives/community-landing-page.client.directive');

var _communityLandingPageClient2 = _interopRequireDefault(_communityLandingPageClient);

var _communityFeedClient = require('./directives/community-feed.client.directive');

var _communityFeedClient2 = _interopRequireDefault(_communityFeedClient);

var _groupClient3 = require('./services/group.client.service');

var _groupClient4 = _interopRequireDefault(_groupClient3);

var _groupClassificationClient3 = require('./services/group-classification.client.service');

var _groupClassificationClient4 = _interopRequireDefault(_groupClassificationClient3);

var _viewGroupsCategoriesClient3 = require('./services/view-groups-categories.client.service');

var _viewGroupsCategoriesClient4 = _interopRequireDefault(_viewGroupsCategoriesClient3);

var _editSettingsGroupClient3 = require('./services/edit-settings-group.client.service');

var _editSettingsGroupClient4 = _interopRequireDefault(_editSettingsGroupClient3);

var _viewOneGroupClientStyle = require('./styles/view-one-group.client.style.scss');

var _viewOneGroupClientStyle2 = _interopRequireDefault(_viewOneGroupClientStyle);

var _communityHomeClientStyle = require('./styles/community-home.client.style.scss');

var _communityHomeClientStyle2 = _interopRequireDefault(_communityHomeClientStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }