import { Router } from 'express'
import auth from './auth'
import passport from 'passport'
import event from './event'
import user from './user'
import category from "./category";


let api = Router()

api.get('/', (req, res) => {
    res.json({ hi: 'project Tut API' })
})

api.use('/user', passport.authenticate('jwt', {session: false}), user);
api.use('/category', passport.authenticate('jwt', {session: false}), category);
api.use('/auth', auth)
api.use('/event',passport.authenticate('jwt', {session: false}), event);

export default api
