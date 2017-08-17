import Slider from '../models/sliders.server.model';
import sliderCtrl from '../controllers/sliders.server.controller';

const homepageRoutes = (app) => {

  app.route('/api/sliders')
    .get(sliderCtrl.getAll)
    .post(sliderCtrl.add);

  app.route('/api/sliders/:sliderId')
    .put(sliderCtrl.edit)
    .delete(sliderCtrl.delete);

};

export default homepageRoutes;
