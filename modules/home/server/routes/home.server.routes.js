import loggedInHome from '../controllers/logged-in-home.server.controller';

const homeRoutes = (app) => {

  app.route('/api/home')
    .get(loggedInHome.list)
    .post(loggedInHome.post);

   app.route('/api/home/:id')
    .put(loggedInHome.update)
    .delete(loggedInHome.remove);

};

export default homeRoutes;