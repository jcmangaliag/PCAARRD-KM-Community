import User from '../models/users.server.model';
import userAuthCtrl from '../controllers/users-authentication.server.controller';
import userCtrl from '../controllers/users.server.controller';
import passportConfig from '../config/users.server.passport';
import env from 'node-env-file';
env(`${__dirname} /../../../../.env`);

/*import jwt from 'express-jwt';

const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
*/

const usersRoutes = (app) => {

  app.route('/api/users/register/')
    .post(userAuthCtrl.register);

  app.route('/api/users/login/')
    .post(userAuthCtrl.login);

  app.route('/api/users/allow-admin-registration')
    .post(userAuthCtrl.allowAdminRegistration);

  app.route('/api/users')
    .get(userCtrl.list);

  app.route('/api/users/:userID')
    .get(userCtrl.listOne)
    .put(userCtrl.updateOne);

  app.route('/api/users/group/:groupHandle')
    .get(userCtrl.listByGroup);

  app.route('/api/users/group-adminstrators/:groupAdminsID')
    .get(userCtrl.listByGroupAdminstrators);

  app.route('/api/users/:userID/join-group/:groupHandle')
    .put(userCtrl.joinGroup);

  app.route('/api/users/:userID/leave-group/:groupHandle')
    .put(userCtrl.leaveGroup);

/*  // Catch unauthorised errors
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"message" : err.name + ": " + err.message});
    }
  });*/

};

export default usersRoutes;