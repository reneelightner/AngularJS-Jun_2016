
angular.module('MyApp.Grid')

.controller('GridController', function(Utilities, SetGlobals, GridUtilities) {

	var self = this;

}).directive('myGrid', function () {

	    return {
	        restrict: 'E',
	        templateUrl: 'app/main/gridtemp.html', //path from index.html
	        scope: {// attributes bound to the scope of the directive
	          gridOptions : '='
	        }
	    };

});

