import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import config from './config/core.server.config';
import mongoDB from './config/core.server.db';
import moduleRoutes from './routes/core.server.routes';

const app = express();
app.use(bodyParser.json());

moduleRoutes(app);

app.use(express.static(`${__dirname} /../../`));

app.all('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../client/base-view/core-content.client.view.html`));
});

app.listen(config.port, () => {
	console.log(`Server running on ${config.host}:${config.port}`);
});