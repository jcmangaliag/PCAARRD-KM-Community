import groupClassificationCtrl from '../controllers/groups-classification.server.controller';

const groupsRoutes = (app) => {

  app.route('/api/groups/classifications')
    .get(groupClassificationCtrl.list)
    .post(groupClassificationCtrl.post);

  app.route('/api/groups/classifications/:id')
    .get(groupClassificationCtrl.listOne)
    .delete(groupClassificationCtrl.removeOne);




/*  app.route('/api/posts/category/:category')
  	.get(postCtrl.listByCategory);

  app.route('/api/posts/:id')
  	.get(postCtrl.listOne)
  	.delete(postCtrl.removeOne);

  app.route('/api/posts/reactions/:id')
  	.put(postCtrl.updateReactions);*/
};

export default groupsRoutes;