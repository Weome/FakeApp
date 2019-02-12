const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let components = {
	light1: false,
	light2: false,
	light3: false,
	light4: false,
	tv1: false,
	tv2: false,
	tv3: false
};

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.sendFile('index.html', { root: __dirname });
});

app.get('/getComponents', function(req, res) {
	const keys = Object.keys(components);
	const devices = keys.map(f => ({
		id: f,
		name: f,
		location: "Bedroom",
		power: components[f],
		model: f.indexOf("light") > -1 ? "Light" : "TV",
	}));
	res.json(devices);
});

app.get('/toggleComponent', function(req, res) {
	if (components[`${req.query.c}`] != undefined) {
		components[`${req.query.c}`] = !components[`${req.query.c}`];
		res.sendStatus(200);
	} else res.sendStatus(403);
});

app.listen(8080);
