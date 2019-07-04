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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())


db.sync({ force: false }).then(() => {
    app.use('/api', routes)

    app.use((err, res, next) => {
        res.json({ err: err.message })
    })

    app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
})


