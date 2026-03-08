'use strict';

// Import logging utility and app information store
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

// Controller for the home/start page
const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    // Prepare data for the start page view
    const viewData = {
      title: "Game Completion App",
      info: appStore.getAppInfo()
    };
    
    // Render the start template with data
    response.render('start', viewData);   
  },
};

export default start;
