//const {Router} = require('express');

import { Router } from 'express';
import User from './app/models/User';
import mongoose from 'mongoose';

const routes = new Router();


routes.get('/', async (req,res) =>{
    await User.create({
        nome: 'Stitch4',
        email: 'dog@dog.com',
        password:'123456'
    },function (err, small){
        if(err) return res.status(400).json({error: "erro: não consegui cadastrar"});
        return res.status(200).json({error: "Usuario foi cadastrado."});
    });
   
})

routes.get('/contatos',(req,res) =>{
    res.send("Contatos para resolver");
})

//module.exports = routes;

export default routes;