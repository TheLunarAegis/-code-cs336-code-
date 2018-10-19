/* Name:		Jordan Hordyk
 * Date:		10-19-2018
 * Lab:			07
 * Class:		CS 336
 * Professor:	Keith Vander Linden
 */


const express = require('express')
const app = express()
const bodyParser = require("body-parser");


const HOST = "localhost";
const port = 3000


app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/fetch", function(req, res) {
    res.send({"content" : "Hello " + req.query.name + ", I am pleased to report that something happened."});
});


app.all("*", (req, res) => {
    res.sendStatus(http_status.NO_CONTENT);
})


app.listen(port, () => console.log(`Lab 07 listening on port ${port}!`));