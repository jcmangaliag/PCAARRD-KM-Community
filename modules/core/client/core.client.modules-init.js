import angular from 'angular';

import homeModule from '../../home/client/home.client.packages';
import groupModule from '../../groups/client/groups.client.packages';
import layoutModule from '../../layout/client/layout.client.packages';

(function () {
	'use strict';

	angular.bootstrap(document, ['home.routes', 'groups.routes']);

})();