import postCtrl from '../controllers/posts.server.controller';

const postsRoutes = (app) => {

  app.route('/api/posts')
    .get(postCtrl.list)
    .post(postCtrl.post);

  app.route('/api/posts/category/:category')
    .get(postCtrl.listByCategory);

  app.route('/api/posts/groupBelonged/:handle')
    .get(postCtrl.listByGroupBelonged);

  app.route('/api/posts/groupBelonged/:handle/category/:category')
    .get(postCtrl.listByGroupBelongedAndCategory);

  app.route('/api/posts/:id')
  	.get(postCtrl.listOne)
  	.delete(postCtrl.removeOne);

  app.route('/api/posts/reactions/:id')
  	.put(postCtrl.updateReactions);
};

export default postsRoutes;