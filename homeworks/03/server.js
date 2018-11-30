/*Student:		Jordan Hordyk
 *Date:			11-28-2018
 *Class:		CS 336
 *Lab:			13
 *Professor:	Keith Vander Linden
 */

var peopleArray = [];

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var password = process.env.MONGO_PASSWORD;
var db;
var peopleArray;

MongoClient.connect('mongodb://cs336:' + password + '@ds255403.mlab.com:55403/cs336', function (err, client) {
	if (err) {
        throw err;
    }

    db = client.db('cs336')

    db.collection('peoples').find().toArray(function (err, result) {
        if (err) throw err

        peopleArray = result;

    })

    app.listen(app.get('port'), function () {
        console.log('Server started: http://localhost:' + app.get('port') + '/');


    })
});

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'app')));
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

app.get('/people', (req, res) => {
    var collection = db.collection('peoples');
    collection.find({}).toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
            res.json(docs);
        }
    });
});

app.post('/people', (req, res) => {
    db.collection('peoples').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
        }
    });
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id == req.body.id) {
            res.send({'content':'ERROR: ID already exists, please select another'});
            return;
        }
    }
    var person = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate
    };
    peopleArray.push(person);

    var collection = db.collection('peoples');
    collection.insertOne({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate
    });

    res.send({
        'content': 'Added: ' + req.body.firstName + " " + req.body.lastName
    });
});

//curl -X POST localhost:3000/people -d '{"id":"911911","firstName":"testing","lastName":"POSTINCURL","startDate":"0002-12-12"}' -H 'Content-Type: application/json'
app.post('/getPerson', (req, res) => {
    var requestedID = req.body.id;
    var person = getPerson(req.body.id);
    if (person != '404') {
        res.send({
            "person": JSON.stringify(person)
        });
    } else {
        res.sendStatus(404);
    }
});

// NEW GET ID
app.get('/person/:id', (req, res) => {
    var collection = db.collection('peoples');
    collection.find({}).toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
        }
    });

    var response = getPerson(req.params.id);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

// New Delete ID
//curl -X DELETE localhost:3000/person/1 -H 'Content-Type: application/json'
app.delete('/person/:id', (req, res) => {
    db.collection('peoples').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
        }
    });
    var idToDelete = req.params.id;
    var collection = db.collection('peoples');
    // I used deleteMany just in case someone messes up insert
    collection.deleteMany({
        id: idToDelete
    });

    collection.find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
        }
    });

    res.send("Person with id: " + idToDelete + " has been removed");
});

//curl -X PUT localhost:3000/person/911911 -d '{"id":"911911","firstName":"testing","lastName":"POSTINCURL_UPDATED","startDate":"0002-12-12"}' -H 'Content-Type: application/json'
// PUT / UPDATE 
app.put('/person/:id', function (req, res) {

    db.collection('peoples').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
        }
    });
    var collection = db.collection('peoples');
    var idToUpdate = req.params.id;

    collection.updateMany({
        id: idToUpdate
    }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            startDate: req.body.startDate
        }
    })
    res.send(req.body.firstName + " with ID# " + req.params.id + " has been changed");
    collection.find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
        }
        peopleList = docs;
    })
});

app.get('/person/:id/name', (req, res) => {
    db.collection('peoples').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
        }
    });
	
    var request = req.params.id;
    var response = getName(request);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

app.get('/person/:id/years', (req, res) => {
    db.collection('peoples').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            peopleArray = docs;
        }
    });

    var response = getYears(req.params.id);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

function getYears(id) {
    var today = new Date();
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id == id) {
            var startDate = new Date(peopleArray[i].startDate)
            var years = (Math.floor((today - startDate) / (1000 * 60 * 60 * 24 * 365)));
            return years;
        }
    }
    return '404';
}

function getName(id) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id == id) {
            return (peopleArray[i].firstName + " " + peopleArray[i].lastName);
        }
    }
    return '404';
}

function getPerson(id) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id == id) {
            return peopleArray[i];
        }
    }
    return '404';
}

// NEW: 
app.all("*", (req, res) => {
    res.sendStatus(404);
})