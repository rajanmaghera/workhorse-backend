const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true }));

const baseurl = '/api'


app.post(`${baseurl}/saveUser`, (req,res) => {

    console.log (req.body);
    res.sendStatus(200)

})

app.listen(port, () => {
    console.log(`Workhorse-backend (Express) listening at http://localhost:${port}`)
})