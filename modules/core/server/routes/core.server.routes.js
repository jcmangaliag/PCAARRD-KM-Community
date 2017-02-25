import postRoutes from '../../../posts/server/routes/posts.server.routes';
import commentRoutes from '../../../comments/server/routes/comments.server.routes';

const moduleRoutes = (app) => {
	postRoutes(app),
	commentRoutes(app)
};

export default moduleRoutes;