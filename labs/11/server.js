/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

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

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/comments', function (req, res) {
    // Get the documents collection
    var collection = db.collection('I_forgot');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        //console.log("Found the following records");
        //console.log(docs)
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
