import postCtrl from '../controllers/posts.server.controller';

const postsRoutes = (app) => {

  app.route('/api/posts')
    .get(postCtrl.list)
    .post(postCtrl.post);

  app.route('/api/posts/:id')
  	.get(postCtrl.listOne)

};

export default postsRoutes;