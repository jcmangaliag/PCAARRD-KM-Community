import postCtrl from '../controllers/posts.server.controller';

const postsRoutes = (app) => {

  app.route('/api/posts')
    .get(postCtrl.list)
    .post(postCtrl.post);

  app.route('/api/posts/:id')
  	.get(postCtrl.listOne);

  app.route('/api/posts/reactions/:id')
  	.put(postCtrl.updateReactions);
};

export default postsRoutes;