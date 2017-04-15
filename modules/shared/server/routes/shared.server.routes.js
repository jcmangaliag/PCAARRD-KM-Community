import sharedCtrl from '../controller/shared.server.controller';

const sharedRoutes = (app) => {

  app.route('/api/uploads/files')
    .post(sharedCtrl.uploadFile);

};

export default sharedRoutes;