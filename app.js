import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


const baseurl = '/api'

// Connect to DB

import mongoose from 'mongoose'


var db = mongoose.connect('mongodb://localhost:27017/workhorse', {useNewUrlParser: true, useUnifiedTopology: true}).
    catch(error => handleError(error))

import User from './user.js'
import Employee from './employee.js'
import Foobar from './foobar.js'
import pkg from 'bson';
const { ObjectId } = pkg;

app.use(cors({origin: 'http://localhost:4200'}));

// Databsa


// ---AUTH METHODS---

function authNewRefreshToken() {
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    })
}

// ---SERVER REST REQUESTS---

// create user

app.all(`${baseurl}/saveUser`, (req,res) => {

    var mod = new User(req.body)
    mod.save()
    res.sendStatus(200)

})

app.all(`${baseurl}/getUserInfo`, (req,res) => {

    User.getInformation(req.cookies['jwt'], function(err,obj) {
        if (err) res.send(err)

        console.log(obj)

        res.send(User.findOne({ _id: ObjectId('6007cf3994fd1b40a0717b32') }))
    })
})

app.all(`/woah`, (req,res) => {
    res.redirect('https://google.com')

})

app.all(`${baseurl}/auth`, (req,res) => {

    User.find({username: req.body.username}, function(err,obj) {
        if (err) return err
        else if (obj.length == 0) res.send("Username was not found")
        else {
            console.log(`Attempting to authenticate user: ${obj[0].username}`)
            obj[0].grantToken(req.body.password, function(err, token) {
                if (err) return(err)
                if (!token) return(res.status(404).send("Your identity could not be verified"))
                res.cookie("jwt", token, {secure: false, httpOnly: false})
                res.send()
            })
        }
    })
})

// create employee

app.all(`${baseurl}/saveEmployee`, (req,res) => {

    var mod = new Employee(req.body)
    mod.save()
    res.sendStatus(200)

})

app.listen(port, () => {
    console.log(`Workhorse-backend (Express) listening at http://localhost:${port}`)
})

// get employee list -- DUMMY

app.all(`${baseurl}/getEmployeeList`, (req,res) => {

    var dummyEmployeeList = [
        {name: "John McDonald", role: "Kitchen"},
        {name: "Olivia MacKenzie", role: "Waiter"},
        {name: "William Shakespeare", role: "Chef"},
    ]
    res.status(200).send(dummyEmployeeList)
})

// get db -- DUMMY

app.all(`${baseurl}/foobarGet`, (req,res) => {

    Foobar.find({ }, function (err, results) {

        if (err) return res.status(500).send(err)
        res.status(200).send(results)
        }
     
)})

// set db -- DUMMY

app.all(`${baseurl}/foobarSet`, (req,res) => {


    var instance = new Foobar(req.body)

    instance.save(function(err) {
        if (err) return res.status(300).send(err)
        res.sendStatus(200)

    })
 
    
})