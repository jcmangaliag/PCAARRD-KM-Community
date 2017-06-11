import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport';
import appConfig from './config/core.server.app-config';
import mongoDB from './config/core.server.db';
import moduleRoutes from './routes/core.server.routes';

const app = express();
const rootDirectory = `${__dirname} /../../..`;

app.use(favicon(path.join(`${rootDirectory}/client/core/assets`, 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(passport.initialize());

moduleRoutes(app);

app.use(express.static(`${rootDirectory}/public`));
app.use(express.static(`${rootDirectory}/client`));
app.use(express.static(`${rootDirectory}/uploads`));

app.all('/*', (req, res) => {
	res.sendFile(path.join(`${rootDirectory}/client/core/base-view/core-content.client.view.html`));
});

app.listen(appConfig.port, () => {
	console.log(`Server running on ${appConfig.host}:${appConfig.port}`);
});