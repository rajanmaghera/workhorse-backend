import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

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
import pkg from 'bson';
const { ObjectId } = pkg;

// Databsa


// ---AUTH METHODS---

function authVerify (token, next) {

}

function authNewRefreshToken() {
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    })
}

// ---SERVER REST REQUESTS---

// create user

app.post(`${baseurl}/saveUser`, (req,res) => {

    var mod = new User(req.body)
    mod.save()
    res.sendStatus(200)

})

app.get(`${baseurl}/getUserInfo`, (req,res) => {

    User.getInformation(req.cookies['jwt'], function(err,obj) {
        if (err) res.send(err)

        console.log(obj)

        res.send(User.findOne({ _id: ObjectId('6007cf3994fd1b40a0717b32') }))
    })
})

app.post(`${baseurl}/auth`, (req,res) => {

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

app.post(`${baseurl}/saveEmployee`, (req,res) => {

    var mod = new Employee(req.body)
    mod.save()
    res.sendStatus(200)

})

app.listen(port, () => {
    console.log(`Workhorse-backend (Express) listening at http://localhost:${port}`)
})