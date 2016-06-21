var myModule = angular.module("MyApp", []);

myModule.controller('MyController', function(){
	//what part of my view will this controller be responsible for?
	//add ng-controller="MyController" to a div
	var self = this;//always do this so you're not always writing 'this'
	self.myName = "George";
	self.age = 12;
	self.job = 'Developer';
	//self/this = info I'm adding to the controller, what the view has access to
	//we will take this array and display everything on the screen
	self.simpleNameArray = ["max", "tom", "jerry"];

	self.objectsArray = [{
			fName: 'Sam',
			lName: 'Johnson'
		}, {
			fName: 'Jake',
			lName: 'Hall'
	}];

	self.dog={
		name: "Max",
		age: 7,
		owner: "Tim",
		breed: "Husky"
	};

	self.student = {
		name: {
			fName: "Tom"
		}
	};

	self.fallSeason = {
		description: "Fall is the best"
	};
	self.winterSeason = {
		description: "Winter is the worst"
	};
	self.springSeason = {
		description: "Spring is nice"
	};
	self.summerSeason = {
		description: "Summer is hot"
	};

	self.userString = "redClass";

	self.cssObject = {
		redClass: false
	};

});