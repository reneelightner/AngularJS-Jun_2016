(function() {
  'use strict';

  angular
    .module('template', [
    	'ngAnimate', 
    	'ngResource', 
    	'ui.router', 
    	'ui.bootstrap',
    	'MyApp.Home',
    	'MyApp.Store',
    	'MyApp.Contacts',
        'MyApp.Shared'
    ]);

})();
