const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const appRoute = require('./routes/route');
app.use('/', appRoute);

app.listen(5000, () => console.log(`Listening on port 5000`));