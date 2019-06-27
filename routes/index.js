import { Router } from 'express'
import auth from './auth'
import passport from 'passport'


let api = Router()

api.get('/', (req, res) => {
    res.json({ hi: 'startupWeek API' })
})

// api.use('/event', passport.authenticate('jwt', {session: false}), user);
api.use('/auth', auth)
// api.use('/games',passport.authenticate('jwt', {session: false}), game)

export default api
