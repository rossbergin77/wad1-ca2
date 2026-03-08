'use strict';

// Import logging utility and collection store
import logger from "../utils/logger.js";
import collectionStore from "../models/collection-store.js";

// Controller for the dashboard page that displays all collections
const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    // Gather all collections to display
    const viewData = {
      title: "Completionist App Dashboard",
      collections: collectionStore.getAllCollections()
    };
    
    // Log retrieved collections for debugging
    logger.debug(viewData.collections);
    
    // Render the dashboard template
    response.render('dashboard', viewData);
  },
};

export default dashboard;