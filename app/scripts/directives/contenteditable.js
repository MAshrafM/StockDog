'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:contenteditable
 * @description
 * # contenteditable
 */
 var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
 angular.module('stockDogApp')
  .directive('contenteditable', function ($sce) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, $element, $attrs, ngModelCtrl) {
        if(!ngModelCtrl) { return; }
        //  UI updated
        ngModelCtrl.$render = function() {
          $element.html($sce.getTrustedHtml(ngModelCtrl.$viewValue || ''));
        };
        // Read HTML and write data to the model or reset the view
        var read = function () {
          var value = $element.html();
          if ($attrs.type === 'number' && !NUMBER_REGEXP.test(value)) {
            ngModelCtrl.$render();
          } else {
            ngModelCtrl.$setViewValue(value);
          }
        };
        //  custom parser-based input type (only 'number' supported)
        // This will be applied to the $modelValue
        if ($attrs.type === 'number') {
          ngModelCtrl.$parsers.push(function (value) {
            return parseFloat(value);
          });
        }
        // Listen for change events to enable binding
        $element.on('blur keyup change', function() {
          $scope.$apply(read);
        });
      }
    };
});
