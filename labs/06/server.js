/*Student:		Jordan Hordyk
 *Date:			10-12-2018
 *Class:		CS 336
 *Project:		lab_06
 *Professor:	Keith VanderLinden
 */

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/request', function (req, res) {
  res.send('GET Request : OK')
})

app.head('/request', function (req, res) {
  res.send('HEAD Request : OK')
})

app.post('/request', function (req, res) {
  res.send('POST Request : OK')
})

app.put('/request', function (req, res) {
  res.send('PUT Request @ /request : OK')
})

app.delete('/request', function (req, res) {
  res.send('DELETE Request @ /request : OK')
})

app.get("*", (req, res) => {
	res.sendStatus(418);
})

app.post('/forms/my-handling-form-page', function (req, res)
		 {
  		  res.send
		   (' Submitted!<br>Username: '
		    + req.body.user_name
    	    +'<br>Email: '
			+ req.body.user_mail
			+ '<br>Message: '
			+ req.body.user_message
		   )
		 }
		)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
