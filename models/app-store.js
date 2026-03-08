'use strict';

// Import logging utility and JSON store
import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

// Store for app-level information (title, version, location, email, etc.)
const appStore = {

  // Initialize database connection to app-store.json
  store: new JsonStore('./models/app-store.json', { info: {} }),
  collection: 'info',
  array: 'creators',

  // Retrieve all app information from the store
  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

export default appStore;
