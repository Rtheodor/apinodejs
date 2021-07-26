//const {Router} = require('express');

import { Router } from 'express';
import mongoose from 'mongoose';
import User from './app/models/User';

import UserController from './app/controllers/UserController';
import loginController from './app/controllers/loginController';


const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/login', loginController.store);

export default routes;