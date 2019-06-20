"use strict";
require("dotenv/config");
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
// Parse incoming request available "req.body"
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
})

// response with file
app.get('/docs', function (req, res) {
    res.sendFile(path.join(__dirname, '../docs/setup_server_node.html'));
})

//404 for routes undefined
app.use((req, res, next) => {
    res.status(404).send('oops')
})

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
