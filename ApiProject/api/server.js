const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    config = require('config'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport');

let connect = mongoose.connect('mongodb://localhost:27017/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then (() => console.log('Mango has started'))
    .catch(e => console.log(e))


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(
    require(config.get('routes.tasks')),
    require(config.get('routes.task'))
);

app.listen(3000, () => console.log('Server has been started...'));