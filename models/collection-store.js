
'use strict';

// Import logging utility and JSON store
import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

// Store for managing game collections and their games
const collectionStore = {

  // Initialize database connection to collection-store.json
  store: new JsonStore('./models/collection-store.json', { gameCollection: [] }),
  collection: 'gameCollection',
  array: 'games',

  // Retrieve all game collections
  getAllCollections() {
    return this.store.findAll(this.collection);
  },
  // Retrieve a single collection by its ID
  getCollection(id) {
    return this.store.findOneBy(this.collection, (collection => collection.id === id));
},
addGame(id, game) {
    this.store.addItem(this.collection, id, this.array, game);
},
  async addCollection(collection, file, response) {
    try {
      playlist.picture = await this.store.addToCloudinary(file);
      this.store.addCollection(this.collection, collection);
      response();
    } catch (error) {
      logger.error("Error processing collection:", error);
      response(error);
    }
  },
removeGame(id, gameId) {
    this.store.removeItem(this.collection, id, this.array, gameId);
},
  async removeCollection(id, response) {
    const collection = this.getCollection(id);

    if (collection.picture && collection.picture.public_id) {
      try {
        await this.store.deleteFromCloudinary(collection.picture.public_id);
        logger.info("Cloudinary image deleted");
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }

    this.store.removeCollection(this.collection, collection);
    response();
  },

editGame(id, gameId, updatedGame) {
    this.store.editItem(this.collection, id, gameId, this.array, updatedGame);
},
searchCollection(search) {
    return this.store.findBy(
      this.collection,
      (collection => collection.title.toLowerCase().includes(search.toLowerCase())))
},
getUserCollections(userid) {
  return this.store.findBy(this.collection, (collection => collection.userid === userid));
},

searchUserCollections(search, userid) {
  return this.store.findBy(
    this.collection,
    (collection => collection.userid === userid && collection.title.toLowerCase().includes(search.toLowerCase())))
}, 

};

export default collectionStore;
