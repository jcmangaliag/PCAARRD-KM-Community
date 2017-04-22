import User from '../models/users.server.model';
import userAuthCtrl from '../controllers/users-authentication.server.controller';
import userCtrl from '../controllers/users.server.controller';
import passportConfig from '../config/users.server.passport';
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

  app.route('/api/users/:userID')
    .get(userCtrl.listOne);

/*  // Catch unauthorised errors
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"message" : err.name + ": " + err.message});
    }
  });*/

};

export default usersRoutes;