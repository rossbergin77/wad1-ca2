'use strict';

// Import logging utility and collection store
import logger from '../utils/logger.js';
import collectionStore from '../models/collection-store.js';
import { v4 as uuidv4 } from 'uuid';


// Controller for viewing a single game collection
const collection = {
 createView(request, response) {
    const collectionId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Collection id = ' + collectionId);
    
    const viewData = {
      title: 'Collection',
      singleCollection: collectionStore.getCollection(collectionId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };

    response.render('collection', viewData);
},

  
  addGame(request, response) {
    const collectionId = request.params.id;
    const collection = collectionStore.getCollection(collectionId);
    const newGame = {
      id: uuidv4(),
      title: request.body.title,
      percentage: request.body.percentage,
    };
    collectionStore.addGame(collectionId, newGame);
    response.redirect('/collection/' + collectionId);
},
deleteGame(request, response) {
    const collectionId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug(`Deleting Game  $(gameId} from Collection ${collectionId}`);
    collectionStore.removeGame(collectionId, gameId);
    response.redirect('/collection/' + collectionId);
},
updateGame(request, response) {
    const collectionId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug("updating game " + gameId);
    const updatedGame = {
      id: gameId,
      title: request.body.title,
      artist: request.body.percentage
    };
    collectionStore.editGame(collectionId, gameId, updatedGame);
    response.redirect('/collection/' + collectionId);
}


};

export default collection;