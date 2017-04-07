import postRoutes from '../../../posts/server/routes/posts.server.routes';
import commentRoutes from '../../../comments/server/routes/comments.server.routes';
import groupRoutes from '../../../groups/server/routes/groups.server.routes';

const moduleRoutes = (app) => {
	postRoutes(app),
	commentRoutes(app),
	groupRoutes(app)
};

export default moduleRoutes;