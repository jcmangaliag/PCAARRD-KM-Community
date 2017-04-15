import postRoutes from '../../../posts/server/routes/posts.server.routes';
import commentRoutes from '../../../comments/server/routes/comments.server.routes';
import groupRoutes from '../../../groups/server/routes/groups.server.routes';
import sharedRoutes from '../../../shared/server/routes/shared.server.routes';

const moduleRoutes = (app) => {
	groupRoutes(app),
	postRoutes(app),
	commentRoutes(app),
	sharedRoutes(app)
};

export default moduleRoutes;