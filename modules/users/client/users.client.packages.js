import userModule from './config/users.client.init-module';
import userRoutes from './config/users.client.routes';

import UserAuthenticationControler from './controllers/user-authentication.client.controller';
import UserController from './controllers/user.client.controller';
import EditUserController from './controllers/edit-user.client.controller'; 

import userRegistrationDirective from './directives/user-registration.client.directive';
import userLoginDirective from './directives/user-login.client.directive';

import UserAuthenticationService from './services/user-authentication.client.service';
import UserService from './services/user.client.service';
import EditUserService from './services/edit-user.client.service';