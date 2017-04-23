import sharedCtrl from '../controller/shared.server.controller';

const sharedRoutes = (app) => {

  app.route('/api/uploads/files')
    .post(sharedCtrl.uploadFile);

  app.route('/api/uploads/image')
    .post(sharedCtrl.uploadImage);

};

export default sharedRoutes;