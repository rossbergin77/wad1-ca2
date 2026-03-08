'use strict';

// Import lowdb for JSON file-based database operations
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// Generic JSON store class for CRUD operations on JSON data files
class JsonStore {
  // Initialize database with file path and default structure
  constructor(file, defaults) {
    this.db = new Low(new JSONFile(file), defaults);
    this.db.read();
  }

  // Get all items from a collection
  findAll(collection) {
    return this.db.data[collection];
  }

  // Find multiple items matching a filter condition
  findBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results;
  }

  // Find a single item matching a filter condition
  findOneBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results[0];
  }

  // Add a new collection to the database
  async addCollection(collection, obj) {
    this.db.data[collection].push(obj);
    await this.db.write();
  }

  // Add an item to an array within a collection
  async addItem(collection, id, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    data[0][arr].push(obj);
    await this.db.write();
  }

  // Remove an entire collection from the database
  async removeCollection(collection, obj) {
    const index = this.db.data[collection].indexOf(obj);
    if (index > -1) {
      this.db.data[collection].splice(index, 1);
    }
    await this.db.write();
  }

  // Remove a specific item from an array within a collection
  async removeItem(collection, id, arr, itemId) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    const item = data[0][arr].filter((i) => i.id === itemId);
    const index = data[0][arr].indexOf(item[0]);
    if (index > -1) {
      data[0][arr].splice(index, 1);
    }
    await this.db.write();
  }

  // Update an entire collection in the database
  async editCollection(collection, id, obj) {
    let index = this.db.data[collection].findIndex((c) => c.id === id);
    if (index > -1) {
      this.db.data[collection].splice(index, 1, obj);
    }
    await this.db.write();
  }

  // Update a specific item within an array in a collection
  async editItem(collection, id, itemId, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    let index = data[0][arr].findIndex((i) => i.id === itemId);
    data[0][arr].splice(index, 1, obj);
    await this.db.write();
  }
}

export default JsonStore;

