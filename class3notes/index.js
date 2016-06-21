var myModule = angular.module("MyApp", []);

myModule.controller('MyController', function(){

	var self = this;

	self.firstName = 'George';
	self.lastName = 'Daghr';

	self.cancel = function() {
		console.log("cancel");
    };

    self.done = function() {

    };

    self.edit = function() {

    };

});