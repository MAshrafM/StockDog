'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockDogApp')
// 1 register directive and inject dependency
  .directive('stkWatchlistPanel', function ($location, $modal, WatchlistService) {
    return {
		templateUrl: 'views/templates/watchlist-panel.html',
		restrict: 'E',
		scope: {},
		link: function($scope){
			// 2 initialize variables
			$scope.watchlist = {};
			var addListModal = $modal({
				scope: $scope,
				templateUrl: 'views/templates/addlist-modal.html',
				show: false
			});
			// 3 bind model from service to this scope
			$scope.watchlists = WatchlistService.query();
			//4 display addlist modal
			$scope.showModal = function(){
				addListModal.$promise.then(addListModal.show);
			};
			//5 create new list from field modals
			$scope.createList = function(){
				WatchlistService.save($scope.watchlist);
				addListModal.hide();
				$scope.watchlist = {};
			};
			// 6 delete disired list and redirect home
			$scope.deleteList = function(list){
				WatchlistService.remove(list);
				$location.path('/');
			};

		}
    };
  });
