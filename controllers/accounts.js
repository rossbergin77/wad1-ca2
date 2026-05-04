'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import collectionStore from '../models/collection-store.js';
import { v4 as uuidv4 } from 'uuid';

//create an accounts object
const accounts = {

  //index function to render index page
  index(request, response) {

  const collections = collectionStore.getAllCollections();
  const users = userStore.getAllUsers();

  const numUsers = users.length;
  const numCollections = collections.length;

  const numGames = collections.reduce(
    (total, c) => total + c.games.length,
    0
  );

  const viewData = {
    title: 'Login or Signup',
    stats: {
      numUsers,
      numCollections,
      numGames
    }
  };

  response.render('index', viewData);
},
  
  //login function to render login page
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
  //logout function to render logout page
  logout(request, response) {
    response.cookie('collection', '');
    response.redirect('/');
  },
  
 //signup function to render signup page
  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
 //register function to render the registration page for adding a new user
register(request, response) {

  const user = request.body;
  user.id = uuidv4();

  const picture = request.files.picture;

  userStore.addUser(user, picture, () => {

    response.cookie('collection', user.email);

    logger.info('registering and logging in ' + user.email);

    response.redirect('/start');
  });
},
  //authenticate function to check user credentials and either render the login page again or the start page.
  authenticate(request, response) {
  const user = userStore.getUserByEmail(request.body.email);

  if (user && user.password === request.body.password) {
    response.cookie('collection', user.email);
    logger.info('logging in ' + user.email);
    response.redirect('/start');
  } else {
    logger.info('login failed for ' + request.body.email);
    response.redirect('/login');
  }
},
  
 //utility function getCurrentUser to check who is currently logged in
  getCurrentUser (request) {
    const userEmail = request.cookies.collection;
    return userStore.getUserByEmail(userEmail);
  }
}

export default accounts;
