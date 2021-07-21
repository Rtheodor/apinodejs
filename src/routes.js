//const {Router} = require('express');

import { Router } from 'express';
import mongoose from 'mongoose';
import User from './app/models/User';

import UserController from './app/controllers/UserController';


const routes = new Router();

routes.post('/users', UserController.store);

/*routes.get('/', async (req,res) =>{
    await User.create({
        nome: 'Stitch4',
        email: 'dog@dog.com',
        password:'123456'
    },function (err, small){
        if(err) return res.status(400).json({error: "erro: não consegui cadastrar"});
        return res.status(200).json({error: "Usuario foi cadastrado."});
    });
   
})*/

//module.exports = routes;

export default routes;