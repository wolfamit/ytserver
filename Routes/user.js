import express from "express";
import { login, profile, updatePremium } from '../Controllers/auth.js'
import { updateChanelData, getAllChanels } from "../Controllers/chanel.js";
 
const routes = express.Router()

routes.post('/login',login);
routes.get('/profile',profile);
routes.patch('/success/:_id',updatePremium);
routes.patch('/update/:id',updateChanelData);
routes.get('/getAllChanels',getAllChanels);

export default routes;  