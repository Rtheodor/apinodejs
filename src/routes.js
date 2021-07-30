//const {Router} = require('express');

import { Router } from 'express';
import mongoose from 'mongoose';
import User from './app/models/User';

import UserController from './app/controllers/UserController';
import loginController from './app/controllers/loginController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:id',authMiddleware, UserController.delete);
routes.post('/login', loginController.store);

export default routes;