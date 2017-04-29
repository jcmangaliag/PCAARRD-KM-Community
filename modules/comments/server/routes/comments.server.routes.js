import commentCtrl from '../controllers/comments.server.controller';

const commentsRoutes = (app) => {

  app.route('/api/comments')
  	.get(commentCtrl.list)
    .post(commentCtrl.post);

  app.route('/api/comments/:id')
  	.get(commentCtrl.listOne)
  	.delete(commentCtrl.removeOne);

  app.route('/api/comments/referredPost/:referredPost')
  	.get(commentCtrl.listByReferredPost)
  	.delete(commentCtrl.removeByReferredPost);

  app.route('/api/comments/referredPost/:referredPost/commentedBy/:commentedBy')
  	.get(commentCtrl.listByUserComments);

  app.route('/api/comments/reactions/:id')
  	.put(commentCtrl.updateReactions);

};

export default commentsRoutes;