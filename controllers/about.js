'use strict';

// Import logging utility and app information store
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from './accounts.js';


// Controller for the about page
const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: 'About the Playlist App',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        info: appStore.getAppInfo(),
        picture: loggedInUser.picture,
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
},

};

export default about;