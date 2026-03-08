'use strict';

// Import logging utility and collection store
import logger from '../utils/logger.js';
import collectionStore from '../models/collection-store.js';

// Controller for viewing a single game collection
const collection = {
  createView(request, response) {
    // Extract collection ID from URL parameter
    const collectionId = request.params.id;
    logger.debug(`Collection id = ${collectionId}`);
    
    // Retrieve the specific collection data
    const viewData = {
      title: 'Collection',
      singleCollection: collectionStore.getCollection(collectionId)
    };

    // Render the collection template
    response.render('collection', viewData);
  },
};

export default collection;