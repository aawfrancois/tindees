import {Router} from 'express';
import User from '../models/user';
import _ from "lodash";

import dotenv from 'dotenv';

dotenv.config();

let api = Router();

api.get("/profil/:uuid", async (request, response) => {
    try {
        const uuid = request.params.uuid;
        const user = await User.findOne({where: {uuid}});
        if (user) {
            console.log(`User ${uuid} profil find`);
            response.status(200).json({
                data: {
                    user,
                    meta: {},
                }
            });
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(400).json({
            err: error.message
        });
    }
});

api.delete('/:uuid', async (req, res) => {
    try {
        let user = await User.destroy({where: {uuid: req.params.uuid}});
        console.log(`Deleted user: ${user} `);
        res.status(200).json({succes: `${user} deleted`});
    } catch (e) {
        res.status(400);
    }
});

api.get("/", async (request, response) => {
    try {
        let user = await User.findAll()
        if (user) {
            response.status(200).json({
                data: {
                    user,
                    meta: {},
                }
            });
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(400).json({
            err: error.message
        });
    }
});

api.put("/profil/:uuid", async (request, response) => {
    try {
        const uuid = request.params.uuid;
        const user = await User.findOne({where: {uuid}});
        if (!user) {
            response.status(404).send();
            return;
        }
        let field = _.pick(request.body, [
            "nickname",
            "email",
            "firstname",
            "lastname",
            "birthdate"
        ]);
        await user.update(field);
        console.log(`User ${uuid} update`);
        response.status(204).json({true: "update ok"});
    } catch (error) {
        response.status(400).json({
            err: error.message
        });
    }
});

export default api
