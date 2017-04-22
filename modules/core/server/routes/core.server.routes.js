import postRoutes from '../../../posts/server/routes/posts.server.routes';
import commentRoutes from '../../../comments/server/routes/comments.server.routes';
import groupRoutes from '../../../groups/server/routes/groups.server.routes';
import sharedRoutes from '../../../shared/server/routes/shared.server.routes';
import userRoutes from '../../../users/server/routes/users.server.routes';

const moduleRoutes = (app) => {
	groupRoutes(app),
	postRoutes(app),
	commentRoutes(app),
	sharedRoutes(app),
	userRoutes(app)
};

export default moduleRoutes;