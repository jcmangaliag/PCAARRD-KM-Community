import postRoutes from '../../posts/routes/posts.server.routes';
import commentRoutes from '../../comments/routes/comments.server.routes';
import groupRoutes from '../../groups/routes/groups.server.routes';
import sharedRoutes from '../../shared/routes/shared.server.routes';
import sliderRoutes from '../../sliders/routes/sliders.server.routes';
import userRoutes from '../../users/routes/users.server.routes';

const moduleRoutes = (app) => {
	groupRoutes(app),
	postRoutes(app),
	commentRoutes(app),
	sharedRoutes(app),
	sliderRoutes(app),
	userRoutes(app)
};

export default moduleRoutes;
