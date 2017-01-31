import homeRoutes from '../../../home/server/routes/home.server.routes';

const moduleRoutes = app => {
	homeRoutes(app);
};

export default moduleRoutes;