import { Router } from 'express'
import User from '../models/user'
// import {newUserEmail} from '../mail/mail'
import moment from 'moment';

import passport from 'passport'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'



dotenv.config()

const api = Router()

api.post('/register', async (req, res) => {

    let {email, password, password_confirmation, firstname, lastname, type, country, address, photo_url} = req.body

    try {
        let user = new User({ email, password, password_confirmation, firstname, lastname, type, country, address, photo_url })
        let data = await user.save()
        // newUserEmail(email, nickname)
        console.log(`User save`);
        res.json({data: data})
    } catch (error) {
        console.log(`${error.message}`);
        res.json({err: error.message})
    }
})


api.post('/login', (req, res, next) => {
    try {
        passport.authenticate('local', {session: false}, (err, user) => {
            if (err) {
                return res.status(400).json({err: err})
            }

            const {nickname, uuid, email} = user
            const payload = {uuid: user.uuid, nickname, email};
            const token = jwt.sign(payload, process.env.JWT_ENCRYPTION);

            console.log(`User connected`);
            res.json({token, data: {user}})
        })(req, res, next)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})


export default api
