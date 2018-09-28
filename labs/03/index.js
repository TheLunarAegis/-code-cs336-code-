/*Student:		Jordan Hordyk
 *Date:			9-19-2018
 *Class:		CS 336
 *Project:		lab_03
 *Professor:	Keith VanderLinden
 */

const express = require('express')
const app = express()
const port = 1337

app.use(express.static('public'))

app.get('/imma_hacker', (req, res) => res.send('Hello World!   This proves that I can edit the text shown on the webpage!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

