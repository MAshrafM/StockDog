'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkStockRow
 * @description
 * # stkStockRow
 */
angular.module('stockDogApp')
  .directive('stkStockRow', function ($timeout, QuoteService) {
    return {
      restrict: 'A',
      require: '^stkStockTable',
      scope:{
        stock: '=',
        isLast: '='
      },
      link: function($scope, $element, $attr, stockTableCtrl){
        // create tooltip for stock
        $element.tooltip({
          placement: 'left',
          title: $scope.stock.company.name
        });
        // add row to table ctrl
        stockTableCtrl.addRow($scope);
        // register stock
        QuoteService.register($scope.stock);
        // deregister company
        $scope.$on('$destroy', function(){
          stockTableCtrl.removeRow($scope);
          QuoteService.deregister($scope.stock);
        });
        // fetch quote
        if($scope.isLast){
          $timeout(QuoteService.fetch);
        }
        //watch changes in shares
        $scope.$watch('stock.shares', function(){
          $scope.stock.marketValue = $scope.stock.shares * $scope.stock.lastPrice;
          $scope.stock.dayChange = $scope.stock.shares * parseFloat($scope.stock.change);
          $scope.stock.save();
        });
      }
    };
  });
