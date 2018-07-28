var express = require('express');
var app = express();
var cors = require('cors');
const database = require('./config/database.js');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Connecting to the database
mongoose.connect(database.url)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
const routes = require('./routes/routes.js');
app.use(routes);

app.listen(3000, function(){
	console.log('Escuchando por el puerto 3000');
});
