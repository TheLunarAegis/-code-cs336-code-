/*Student:		Jordan Hordyk
 *Date:			10-5-2018
 *Class:		CS 336
 *Homework:		01
 *Professor:	Keith VanderLinden
 */

const express = require('express')
const app = express();
const port = 1337

var peopleArray = JSON.parse (`
	[
	{"first_name":"Jordan",    "last_name":"Hordyk", "userId":"TheLunarAegis", "start_date":"1997"},
	{"first_name":"Justine",   "last_name":"Rauch",  "userId":"IntegralCat",   "start_date":"1996"},
	{"first_name":"Ryan",      "last_name":"Schut",  "userId":"FactoredGhost", "start_date":"1996"},
	{"first_name":"Kayla",     "last_name":"Carter", "userId":"ThetaKayla",    "start_date":"1996"},
	{"first_name":"Nathaniel", "last_name":"Bos",    "userId":"SilverSlayer",  "start_date":"1997"}
	]
	`);

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => res.send('Homework 1'))

app.get('/people', (req, res) => { res.json(peopleArray); } );

app.get('/people', (req, res) => {
    res.json(peopleArray);
});

app.get('/person/:userId', (req, res) => {
    var request = req.params.userId;
    var response = getPerson(req.params.userId);
    if (response == "404") {
		res.sendStatus(404);
    } else {
        res.json(response);
    }
});

function getPerson(userId) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].userId == userId) {
            return peopleArray[i];
        }
    }
    return '404';
}

app.get('/person/:userId/name', (req, res) => {
    var request = req.params.userId;
    var response = getName(req.params.userId);
    if (response == "404") {
		res.sendStatus(404);
    } else {
        res.json(response);
    }
});

function getName(userId) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].userId == userId) {
            return (peopleArray[i].firstName + " " + peopleArray[i].lastName);
        }
    }
    return '404';
}

app.get('/person/:userId/years', (req, res) => {
    var response = getYears(req.params.userId);
    if (response == "404") {
		res.sendStatus(404);
    } else {
        res.json(response);
    }
});

function getYears(userId) {
    var today = "2018";
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].userId == userId) {
			return (Number("2018") - Number(peopleArray[i].startDate));
        }
    }
    return '404';
}

app.all("*", (req, res) => {
    res.sendStatus(404);
})
