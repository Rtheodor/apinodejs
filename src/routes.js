//const {Router} = require('express');

import { Router } from 'express';
import mongoose from 'mongoose';

const routes = new Router();


routes.get('/',(req,res) =>{
    res.send("Rafael");
})

routes.get('/contatos',(req,res) =>{
    res.send("Contatos para resolver");
})

//module.exports = routes;

export default routes;