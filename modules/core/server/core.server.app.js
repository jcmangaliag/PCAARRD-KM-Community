import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport';
import appConfig from './config/core.server.app-config';
import mongoDB from './config/core.server.db';
import moduleRoutes from './routes/core.server.routes';

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

moduleRoutes(app);

app.use(express.static(`${__dirname} /../../`));
app.use(express.static(`${__dirname} /../../../`));

app.all('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../client/base-view/core-content.client.view.html`));
});

app.listen(appConfig.port, () => {
	console.log(`Server running on ${appConfig.host}:${appConfig.port}`);
});