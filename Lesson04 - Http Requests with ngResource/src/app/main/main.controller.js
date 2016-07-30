(function() {
  'use strict';

  angular
    .module('template')

    .service('MainControllerDataService', function($resource) {
    	var self = this;

    	var myResourceObject = $resource('assets/json/people.json', {
    		limit: 100
    	}, {
    		getTheListOfPeople: {
    			method: 'GET',
    			isArray: true,
    			headers: {
    				accept: 'application/json',
    				userToken: 'abcdefg'
    			}
    		},
    		saveListOfPeople: {
    			method: 'POST',
    			isArray: false
    		}
    	});

        var myFriendsResource = $resource('assets/json/:userId/profile.json')

    	self.getPeople = function() {
    		return myResourceObject.getTheListOfPeople({
				page: 1,
				search: 'name',
				limit: 5
			})
			.$promise
    	};

        self.getFriends = function(friend) {
            return myFriendsResource.query({
                userId: friend._id
            }).$promise
        };

    	/* Example of a POST request with passing info through the body */

    	// myResourceObject.saveListOfPeople({limit: 5}, [{
    	// 	name: 'geroge',
    	// 	email:'george@nycda.com'
    	// }])
    	// .$promise
    	// .then(function () {

    	// })
    })

    .controller('MainController', function (MainControllerDataService) {
		var self = this;

		self.greeting = "Hello World";

		MainControllerDataService.getPeople()
		.then(function onSuccess(response) {
			self.people = response;
		}, function onError(error) {
            console.log(error);
        });


        self.showFriends = function(person) {
            MainControllerDataService.getFriends(person)
            .then(function (response) {
                person.friends = response;
            })
        };
    });

})();
