'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {
    // get Watchlists
    $scope.watchlists = WatchlistService.query();

    // use loaction.path to watch
    $scope.$watch(function(){
      return $location.path();
    }, function(path){
      if(_.includes(path, 'watchlist')){
        $scope.activeView = 'watchlist';
      }
      else{
        $scope.activeView = 'dashboard';
      }
    });
  });
