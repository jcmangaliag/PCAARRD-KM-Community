import Slider from '../models/sliders.server.model';
import Feature from '../models/features.server.model';
import sliderCtrl from '../controllers/sliders.server.controller';
import featureCtrl from '../controllers/features.server.controller';

const homepageRoutes = (app) => {

  app.route('/api/sliders')
    .get(sliderCtrl.getAll);

  app.route('/api/sliders/:sliderId')
    .put(sliderCtrl.edit)
    .delete(sliderCtrl.delete);

  app.route('/api/features')
    .get(featureCtrl.getAll);

  app.route('/api/features/:featureId')
    .put(featureCtrl.edit);

};

export default homepageRoutes;
