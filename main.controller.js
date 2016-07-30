(function() {
  'use strict';

  angular
    .module('tempate')
    .service('MainControllerDataService',function($resource){

    	var self = this;

    	//we are just creating the resource object not making the request
    	//$resource similar to $.getJson
    	//first paramater is the URL
    	//second parameter is optionial parameters for the url
    	//third
	    var myResourceobject = $resource("assets/json/:income/people.json",{
	    	limit: 100 //things after the ? in the URL
	    },{
	    	getListOfPeople:{
	    		method: "GET",
	    		isArray: true,
	    		headers: {
	    			accept:"application/json",
	    			userToken:"acb"
	    		}
	    	},
	    	saveLisOfPeople:{
	    		method: "POST",
	    		isArray: false
	    	}
	    });

	    //this returns a promise object that handles the response (if its successful or error)
	    self.getPeople = function(){
		    return myResourceobject.getListOfPeople({income:'imc'}).$promise
		    return myResourceobject.getListOfPeople({income:'imc'}).$promise
		    return myResourceobject.getListOfPeople({income:'imc'}).$promise
	    };

    })
    .controller('MainController', function(MainControllerDataService) {
	    var self = this;
	    self.greeting = "Hello World";

	     MainControllerDataService.getPeople()
	     .then(function (response) {//Successful response callback
	     	self.people = response;
	     }, function (error) {//error callback

	     })
	    
	});

  /** @ngInject */

})();
