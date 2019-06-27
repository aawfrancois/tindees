"use strict";
require("dotenv/config");
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import {db} from '../models'
import passport from 'passport'
import '../middleware/passport'


import routes from '../routes'

const app = express()
// Parse incoming request available "req.body"
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: true }))


db.sync({ force: true }).then(() => {
    app.use('/api', routes)

    app.use((err, res, next) => {
        res.json({ err: err.message })
    })

    app.listen(process.env.PORT, err => {
        if (err) {
            console.log(err.end)
            process.exit(1)
        }
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
