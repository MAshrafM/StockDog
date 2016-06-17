'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, $modal, WatchlistService, CompanyService) {
    // initialize
    $scope.companies = CompanyService.query();
    $scope.watchlist = WatchlistService.query($routeParams.listId);
    $scope.stocks = $scope.watchlist.stocks;
    $scope.newStock = {};

    var addStockModal = $modal({
      scope: $scope,
      templateUrl: 'views/templates/addstock-modal.html',
      show:false
    });

    // expose to view
    $scope.showStockModal = function(){
      //addStockModal.$promise.then(addStockModal.show);
      addStockModal.show();
    };

    // call WatchlistModel
    $scope.addStock = function(){
      $scope.watchlist.addStock({
        listId: $routeParams.listId,
        company: $scope.newStock.company,
        shares: $scope.newStock.shares
      });
      addStockModal.hide();
      $scope.newStock = {};
    };
  });
