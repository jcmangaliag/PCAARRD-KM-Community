import homeRoutes from '../../../home/server/routes/home.server.routes';
import postRoutes from '../../../posts/server/routes/posts.server.routes';

const moduleRoutes = app => {
	homeRoutes(app),
	postRoutes(app)
};

export default moduleRoutes;