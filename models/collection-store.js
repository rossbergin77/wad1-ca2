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

};

export default collectionStore;