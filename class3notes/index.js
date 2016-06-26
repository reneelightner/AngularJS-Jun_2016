var myModule = angular.module("MyApp", []);

myModule.controller('MyController', function(){

	var self = this;

	self.firstName = 'George';
	self.lastName = 'Daghr';

	self.inputfirstName = 'George';
	self.inputlastName = 'Daghr';

	self.showName = true;

	self.cancel = function() {
		console.log("cancel");
    };

    self.done = function() {

    };

    self.edit = function() {
    	var trueOrFalse;
    	self.showName == true ? trueOrFalse = false : trueOrFalse = true;
    	self.showName = trueOrFalse;
    };

});