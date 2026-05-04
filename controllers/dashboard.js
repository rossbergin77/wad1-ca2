'use strict';

// Import logging utility and collection store
import logger from "../utils/logger.js";
import collectionStore from "../models/collection-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

// Controller for the dashboard page that displays all collections
const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const collections = searchTerm
        ? collectionStore.searchUserCollections(searchTerm, loggedInUser.id)
        : collectionStore.getUserCollections(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = collections;

      if (sortField) {
        sorted = collections.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Completionist App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        collections: sortField ? sorted : collections,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
        picture: loggedInUser.picture,
      };
      
      logger.info('about to render' + viewData.collections);
      
      response.render('dashboard', viewData);
    }
    else response.redirect('/');

  },


  addCollection(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const timestamp = new Date();
	
    const newCollection = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      rating: parseInt(request.body.rating),
      games: [],
      date: timestamp
    };

    collectionStore.addCollection(newCollection, request.files.picture, function() {
        response.redirect("/dashboard");
    });
  },


  deleteCollection(request, response) {
    const collectionId = request.params.id;
    logger.debug(`Deleting Collection ${collectionId}`);
    collectionStore.removeCollection(collectionId, function() {
      response.redirect("/dashboard");
    });
  },

};

export default dashboard;
