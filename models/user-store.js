'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import { v2 as cloudinary } from "cloudinary";

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },
  
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },
  
addUser(user, pictureFile, callback) {

  cloudinary.uploader.upload(
    pictureFile.tempFilePath,
    (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      user.picture = {
        url: result.secure_url,
        public_id: result.public_id
      };
      this.store.addCollection(this.collection, user);
      callback();
    }
  );
}
};

export default userStore;
