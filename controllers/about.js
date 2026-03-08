'use strict';

// Import logging utility and app information store
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

// Controller for the about page
const about = {
  createView(request, response) {
    logger.info("About page loading!");
    
    // Prepare app information for the about page
    const viewData = {
      title: "Game Completion App About",
      info: appStore.getAppInfo()
    };
    
    // Render the about template
    response.render('about', viewData);   
  },
};

export default about;