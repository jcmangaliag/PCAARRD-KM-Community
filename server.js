import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import moduleRoutes from './modules/core/server/routes/core.server.routes';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

moduleRoutes(app);

app.all('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/modules/core/client/base-view/core.client.base-view.html'));
});

app.listen(PORT, () => {
	console.log('Server running on ' + PORT);
});