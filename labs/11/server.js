/* Student:		Jordan Hordyk
 * Date:		12-10-2018
 * Class:		CS 336
 * Lab:			11
 * Professor:	Keith Vander Linden
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// export MONGO_PASSWORD="password"

var MongoClient = require('mongodb').MongoClient;
var password = process.env.MONGO_PASSWORD;
var db;
var data;

MongoClient.connect('mongodb://cs336:' + password + '@ds255403.mlab.com:55403/cs336', function (err, client) {
    if (err) {
        throw err;
    }
    db = client.db('cs336')
    db.collection('I_forgot').find().toArray(function (err, result) {
        if (err) throw err
        data = result;
    })
    app.listen(app.get('port'), function () {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    })
});

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function (req, res) {
    var collection = db.collection('I_forgot');
    collection.find({}).toArray(function (err, docs) {
        res.json(docs);
    });
});

app.post('/api/comments', function (req, res) {

    // Get the documents collection
    var collection = db.collection('I_forgot');
    // Insert some documents
    collection.insertOne({
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        },
        function (err, result) {
            console.log("Inserted a comment");
            res.json((result));
        });
});
