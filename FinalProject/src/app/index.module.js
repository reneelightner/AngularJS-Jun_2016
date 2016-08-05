(function() {
  'use strict';
  agGrid.initialiseAgGridWithAngular1(angular);
  angular
    .module('template', [
    	'ngAnimate', 
    	'ngResource', 
    	'ui.router', 
    	'ui.bootstrap', 
    	'toastr', 
    	'agGrid',
      'MyApp.Main',
      'MyApp.Map',
      'MyApp.Grid'
    ]);

})();
