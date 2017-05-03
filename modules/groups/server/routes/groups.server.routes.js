import groupClassificationCtrl from '../controllers/groups-classification.server.controller';
import groupCtrl from '../controllers/groups.server.controller';

const groupsRoutes = (app) => {

  app.route('/api/groups/classifications')
    .get(groupClassificationCtrl.list)
    .post(groupClassificationCtrl.post);

  app.route('/api/groups/classifications/:id')
    .put(groupClassificationCtrl.updateOne)
    .delete(groupClassificationCtrl.removeOne);

  app.route('/api/groups')
    .get(groupCtrl.list)
    .post(groupCtrl.post);

  app.route('/api/groups/my-groups/:userID')
    .get(groupCtrl.listByMyGroups);

  app.route('/api/groups/discover-groups/:userID')
    .get(groupCtrl.listByDiscoverGroups);

  app.route('/api/groups/:handle')
    .get(groupCtrl.listOne)
    .put(groupCtrl.updateOne)
    .delete(groupCtrl.removeOne);

  app.route('/api/groups/some/:handles')
    .get(groupCtrl.listSome);

  app.route('/api/groups/administered/:userID')
    .get(groupCtrl.listAdministeredGroups);

  app.route('/api/groups/pending/:userID')
    .get(groupCtrl.listPendingGroups);

  app.route('/api/groups/search/all') 
    .get(groupCtrl.listByGroupSearch);

  app.route('/api/groups/:handle/add-admin/:userID')
    .put(groupCtrl.addAdmin);

  app.route('/api/groups/:handle/remove-admin/:userID')
    .put(groupCtrl.removeAdmin);

  app.route('/api/groups/:handle/add-to-pending-members/:userID')
    .put(groupCtrl.addToPendingMembers);

  app.route('/api/groups/:handle/remove-from-pending-members/:userID')
    .put(groupCtrl.removeFromPendingMembers);
};

export default groupsRoutes;