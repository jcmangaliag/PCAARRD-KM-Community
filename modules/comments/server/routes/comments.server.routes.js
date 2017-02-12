import commentCtrl from '../controllers/comments.server.controller';

const commentsRoutes = (app) => {

  app.route('/api/comments')
    .get(commentCtrl.list)
    .post(commentCtrl.post);

};

export default commentsRoutes;