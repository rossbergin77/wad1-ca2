'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import collection from './controllers/collection.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';



router.post('/dashboard/addcollection', dashboard.addCollection);
router.post('/collection/:id/addgame', collection.addGame);
router.post('/collection/:id/updategame/:gameid', collection.updateGame);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/stats', stats.createView);


router.get('/collection/:id', collection.createView);
router.get('/collection/:id/deletegame/:gameid', collection.deleteGame);
router.get('/dashboard/deletecollection/:id', dashboard.deleteCollection);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);




router.get('/error', (request, response) => response.status(404).end('Page not found.'));


export default router;
