"use strict";
import logger from "../utils/logger.js";
import collectionStore from "../models/collection-store.js";
import accounts from './accounts.js';
import userStore from "../models/user-store.js";


const stats = {
    createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const users = userStore.getAllUsers();
    const numUsers = users.length;

    if (loggedInUser) {
      logger.info("Stats page loading!");

      // app statistics calculations
      const collections = collectionStore.getAllCollections();

      let numCollections = collections.length;

      let numGames = collections.reduce((total, collection) => total + collection.games.length, 0);

      let average = numCollections > 0 ? (numGames / numCollections).toFixed(2) : 0;

      let totalRating = collections.reduce((total, collection) => total + parseInt(collection.rating), 0);

      let avgRating = numCollections > 0 ? totalRating / numCollections : 0;

      let maxRating = collections.length > 0 ? Math.max(...collections.map(collection => collection.rating)) : 0;
      let maxRated = collections.filter(collection => collection.rating === maxRating);
      let favTitles = maxRated.map(item => item.title);

      let longestSize = collections.length > 0 ? Math.max(...collections.map(collection => collection.games.length)) : 0;
      let longestCollections = collections.filter(collection => collection.games.length === longestSize);
      let longestCollectionTitles = longestCollections.map(item => item.title);
      
      const statistics = {
        displayNumCollections: numCollections,
        displayNumGames: numGames,
        displayAverage: average,
        displayAvgRating: avgRating,
        highest: maxRating,
        displayFav: favTitles,
        longest: longestSize,
        longestTitles: longestCollectionTitles,
        displayNumUsers: numUsers,
      };

      const viewData = {
        title: "Completionist App Statistics",
        stats: statistics,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };

      response.render("stats", viewData);
    }
    else response.redirect('/');
  },

};

export default stats;
