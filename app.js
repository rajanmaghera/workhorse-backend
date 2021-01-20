import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true }));

const baseurl = '/api'

// Connect to DB

import mongoose from 'mongoose'


var db = mongoose.connect('mongodb://localhost:27017/workhorse', {useNewUrlParser: true, useUnifiedTopology: true}).
    catch(error => handleError(error))

import User from './user.js'
import Employee from './employee.js'

// Databsa


// ---SERVER REST REQUESTS---

// create user

app.post(`${baseurl}/saveUser`, (req,res) => {

    var mod = new User(req.body)
    mod.save()
    res.sendStatus(200)

})


app.post(`${baseurl}/auth`, (req,res) => {

    User.find({username: req.body.username}, function(err,obj) {
        if (err) return err
        else if (obj.length == 0) {
            res.send("Username was not found")
        } else{
        console.log(`Attempting to authenticate user: ${obj[0].username}`)
        obj[0].comparePassword(req.body.password, function(err, isAuth) {
            if (err) return(err)
            if (isAuth) res.send("user is authenticated!")
            if (!isAuth) res.send("user auth failed")
        }   
        )
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