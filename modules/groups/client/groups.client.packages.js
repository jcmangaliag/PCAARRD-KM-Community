import groupModule from './config/groups.client.init-module';
import groupRoutes from './config/groups.client.routes';

import GroupController from './controllers/group.client.controller';
import GroupClassificationController from './controllers/group-classification.client.controller';
import ViewGroupsCategoriesController from './controllers/view-groups-categories.client.controller.js';

import groupMembersDirective from './directives/group-members.client.directive';
import groupStatisticsDirective from './directives/group-statistics.client.directive';
import groupClassificationsDirective from './directives/group-classifications.client.directive';
import addGroupClassificationDirective from './directives/add-group-classification.client.directive';
import viewGroupsCategoriesDirective from './directives/view-groups-categories.client.directive';

import GroupService from './services/group.client.service';
import GroupClassificationService from './services/group-classification.client.service';
import ViewGroupsCategoriesService from './services/view-groups-categories.client.service';

import viewOneGroupStyle from './styles/view-one-group.client.style.scss';

