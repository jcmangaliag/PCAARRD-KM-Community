'use strict';

var _postsClient = require('./config/posts.client.init-module');

var _postsClient2 = _interopRequireDefault(_postsClient);

var _postsClient3 = require('./config/posts.client.routes');

var _postsClient4 = _interopRequireDefault(_postsClient3);

var _addPostClient = require('./controllers/add-post.client.controller');

var _addPostClient2 = _interopRequireDefault(_addPostClient);

var _addPostCategoriesClient = require('./controllers/add-post-categories.client.controller');

var _addPostCategoriesClient2 = _interopRequireDefault(_addPostCategoriesClient);

var _postClient = require('./controllers/post.client.controller');

var _postClient2 = _interopRequireDefault(_postClient);

var _viewPostsCategoriesClient = require('./controllers/view-posts-categories.client.controller');

var _viewPostsCategoriesClient2 = _interopRequireDefault(_viewPostsCategoriesClient);

var _addPostClient3 = require('./directives/add-post/add-post.client.directive');

var _addPostClient4 = _interopRequireDefault(_addPostClient3);

var _addPostCategoriesClient3 = require('./directives/add-post/add-post-categories.client.directive');

var _addPostCategoriesClient4 = _interopRequireDefault(_addPostCategoriesClient3);

var _addAdvertisementPostClient = require('./directives/add-post/add-advertisement-post.client.directive');

var _addAdvertisementPostClient2 = _interopRequireDefault(_addAdvertisementPostClient);

var _addQuestionPostClient = require('./directives/add-post/add-question-post.client.directive');

var _addQuestionPostClient2 = _interopRequireDefault(_addQuestionPostClient);

var _addEventPostClient = require('./directives/add-post/add-event-post.client.directive');

var _addEventPostClient2 = _interopRequireDefault(_addEventPostClient);

var _addMediaPostClient = require('./directives/add-post/add-media-post.client.directive');

var _addMediaPostClient2 = _interopRequireDefault(_addMediaPostClient);

var _addNewsPostClient = require('./directives/add-post/add-news-post.client.directive');

var _addNewsPostClient2 = _interopRequireDefault(_addNewsPostClient);

var _addOthersPostClient = require('./directives/add-post/add-others-post.client.directive');

var _addOthersPostClient2 = _interopRequireDefault(_addOthersPostClient);

var _addReportPostClient = require('./directives/add-post/add-report-post.client.directive');

var _addReportPostClient2 = _interopRequireDefault(_addReportPostClient);

var _addPostPrivacyClient = require('./directives/add-post/add-post-privacy.client.directive');

var _addPostPrivacyClient2 = _interopRequireDefault(_addPostPrivacyClient);

var _deletePostClient = require('./directives/delete-post.client.directive');

var _deletePostClient2 = _interopRequireDefault(_deletePostClient);

var _searchPostsClient = require('./directives/search-posts.client.directive');

var _searchPostsClient2 = _interopRequireDefault(_searchPostsClient);

var _postsFilterPanelClient = require('./directives/posts-filter-panel.client.directive');

var _postsFilterPanelClient2 = _interopRequireDefault(_postsFilterPanelClient);

var _viewPostsCategoriesClient3 = require('./directives/view-posts/view-posts-categories.client.directive');

var _viewPostsCategoriesClient4 = _interopRequireDefault(_viewPostsCategoriesClient3);

var _viewPostClient = require('./directives/view-posts/view-post.client.directive');

var _viewPostClient2 = _interopRequireDefault(_viewPostClient);

var _viewPostsClient = require('./directives/view-posts/view-posts.client.directive');

var _viewPostsClient2 = _interopRequireDefault(_viewPostsClient);

var _allPostsReactionsClient = require('./directives/view-posts/all-posts-reactions.client.directive');

var _allPostsReactionsClient2 = _interopRequireDefault(_allPostsReactionsClient);

var _onePostReactionsClient = require('./directives/view-posts/one-post-reactions.client.directive');

var _onePostReactionsClient2 = _interopRequireDefault(_onePostReactionsClient);

var _viewAllAdvertisementPostsClient = require('./directives/view-posts/view-all-advertisement-posts.client.directive');

var _viewAllAdvertisementPostsClient2 = _interopRequireDefault(_viewAllAdvertisementPostsClient);

var _viewAllEventPostsClient = require('./directives/view-posts/view-all-event-posts.client.directive');

var _viewAllEventPostsClient2 = _interopRequireDefault(_viewAllEventPostsClient);

var _viewAllMediaPostsClient = require('./directives/view-posts/view-all-media-posts.client.directive');

var _viewAllMediaPostsClient2 = _interopRequireDefault(_viewAllMediaPostsClient);

var _viewAllNewsPostsClient = require('./directives/view-posts/view-all-news-posts.client.directive');

var _viewAllNewsPostsClient2 = _interopRequireDefault(_viewAllNewsPostsClient);

var _viewAllOthersPostsClient = require('./directives/view-posts/view-all-others-posts.client.directive');

var _viewAllOthersPostsClient2 = _interopRequireDefault(_viewAllOthersPostsClient);

var _viewAllQuestionPostsClient = require('./directives/view-posts/view-all-question-posts.client.directive');

var _viewAllQuestionPostsClient2 = _interopRequireDefault(_viewAllQuestionPostsClient);

var _viewAllReportPostsClient = require('./directives/view-posts/view-all-report-posts.client.directive');

var _viewAllReportPostsClient2 = _interopRequireDefault(_viewAllReportPostsClient);

var _postClient3 = require('./services/post.client.service');

var _postClient4 = _interopRequireDefault(_postClient3);

var _addPostClient5 = require('./services/add-post.client.service');

var _addPostClient6 = _interopRequireDefault(_addPostClient5);

var _addPostCategoriesClient5 = require('./services/add-post-categories.client.service');

var _addPostCategoriesClient6 = _interopRequireDefault(_addPostCategoriesClient5);

var _viewPostsCategoriesClient5 = require('./services/view-posts-categories.client.service');

var _viewPostsCategoriesClient6 = _interopRequireDefault(_viewPostsCategoriesClient5);

var _postCategoriesClientStyle = require('./styles/post-categories.client.style.scss');

var _postCategoriesClientStyle2 = _interopRequireDefault(_postCategoriesClientStyle);

var _addQuestionPostClientStyle = require('./styles/add-question-post.client.style.scss');

var _addQuestionPostClientStyle2 = _interopRequireDefault(_addQuestionPostClientStyle);

var _addAdvertisementPostClientStyle = require('./styles/add-advertisement-post.client.style.scss');

var _addAdvertisementPostClientStyle2 = _interopRequireDefault(_addAdvertisementPostClientStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }