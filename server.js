const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/modules/core/base-view'));

app.listen(PORT, function(){
	console.log('Server running on ' + PORT);
});
