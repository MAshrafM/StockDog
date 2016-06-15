'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	// 1 Helper: load watch lists fom local storage
	var loadModel = function(){
		var model = {
			watchlists: localStorage['StockDog.watchlists'] ? JSON.parse(localStorage['StockDog.watchlists']) : [],
			nextId: localStorage['StockDog.nextId'] ? parseInt(localStorage['StockDog.nextId']) : 0
		};
		return model;
	};
	
	// 2 helper save watchlists to local storage
	var saveModel = function(){
		localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
		localStorage['StockDog.nextId'] = Model.nextId;
	};
	
	// 3 helper use lodash to find a watchlist with ids
	var findById = function(listId){
		return _.find(Model.watchlists, function(watchlist){
			return watchlist.id === parseInt(listId);
		});
	};
	
	// 4 return all watchlists or find by given id
	this.query = function(listId){
		if(listId){
			return findById(listId);
		}
		else{
			return Model.watchlists;
		}
	};
	
	// 5 save new watchlist to watchlists model
	this.save = function(watchlist){
		watchlist.id = Model.nextId++;
		Model.watchlists.push(watchlist);
		saveModel();
	};
	
	// 6 remove given watchlist from watchlist model
	this.remove = function(watchlist){
		_remove(Model.watchlists, function(list){
			return list.id === watchlist.id;
		});
		saveModel();
	};
	
	// 7 initialize model for the singlton service
	var Model = loadModel();
  });
