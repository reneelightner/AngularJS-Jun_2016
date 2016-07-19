(function() {
  'use strict';

  angular
    .module('template')
    .service('MainControllerDataService',function($resource){

    	var self = this;

	    var myResourceobject = $resource("http://maps.googleapis.com/maps/api/geocode/json",
	    	null,//the second param is null but it could be whatever is after ? in the url
	    	{getAllAddress:{
	    		method: "GET",
	    		isArray: false
	    	}
	    });

	    //returns a promise object
	    self.getAddress = function(searchedAddress){
		    return myResourceobject.getAllAddress({address:searchedAddress}).$promise //searchedAddress will be at the end of the query, after ?address=
	    };

    })
    .controller('MainController', function(MainControllerDataService) {

    	var self = this;

	    self.searchedAddress = "enter your address search text here"; //what the user puts in the input via ng-model="ctrl.searchedAddress"...
	    
	    self.getAddressFromInput= function() {
		     MainControllerDataService.getAddress(self.searchedAddress)
		     .then(function (response) {
		     	console.log(response.results);
		     	self.addressResults = response.results;
		     }, function (error) {
		     	self.addressResults = {formatted_address:"error"};
		     })
		}
	    
	});

  /** @ngInject */

})();
