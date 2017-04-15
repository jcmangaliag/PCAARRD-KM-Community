import sharedModule from './config/shared.client.init-module';
import sharedToastConfig from './config/shared.client.toast-config';
import sharedEmojiConfig from './config/shared.client.emoji-config';
import sharedProvide from './config/shared.client.provide';

import SharedAddHashtagsController from './controllers/shared-add-hashtags.client.controller';
import SharedAddTechnologyHandlesController from './controllers/shared-add-technology-handles.client.controller';
import SharedAddFilesController from './controllers/shared-add-files.client.controller';

import SharedAddHashtagsDirective from './directives/shared-add-hashtags.client.directive';
import SharedViewHashtagsDirective from './directives/shared-view-hashtags.client.directive';
import SharedAddFilesDirective from './directives/shared-add-files.client.directive';
import SharedViewFilesDirective from './directives/shared-view-files.client.directive';
import SharedDisableSpacesDirective from './directives/shared-disable-spaces.client.directive';
import SharedAddTechnologyHandlesDirective from './directives/shared-add-technology-handles.client.directive';
import SharedViewTechnologyHandlesDirective from './directives/shared-view-technology-handles.client.directive';
import SharedResetSubmitButtonsDirective from './directives/shared-reset-submit-buttons.client.directive';
import SharedFormLegendsDirective from './directives/shared-form-legends.client.directive';
import './directives/shared-file-model.client.directive';

import sharedParseURL from './filters/shared-parse-url.client.filter';

import SharedPaginationService from './services/shared-pagination.client.service';
import SharedUploadFilesService from './services/shared-upload-files.client.service';

import SharedAddHashtagsStyle from './styles/shared-add-hashtags.client.style.scss';
import SharedAddFilesStyle from './styles/shared-add-files.client.style.scss';