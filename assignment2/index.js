var myModule = angular.module("MyApp", []);

myModule.controller('MyController', function(){

	var self = this;

	self.openFolder = false;

	self.items1 = ["File 1.1","File 1.2","File 1.3"];
	self.items2 = ["File 2.1","File 2.2","File 2.3"];
	self.items3 = ["File 3.1","File 3.2","File 3.3"];

	self.sectionSelected = self.items1;

	self.addFile = function() {
		var textAdded = self.fileName;
		self.sectionSelected.push(textAdded);
    }

    self.prioritySelected = false;

    self.high = {
    	showToDo: false,
    	todos: []
    };

    self.med = {
    	showToDo: false,
    	todos: []
    };

    self.low = {
    	showToDo: false,
    	todos: []
    };

    self.addTodo = function() {
		var nameAdded = self.formName;
		var descriptionAdded = self.formDescription;
		var thisObj = {};
		thisObj.name = nameAdded;
		thisObj.description = descriptionAdded;
		//find which radio clicked, add its to do item (thisObj) and make its div show
		self.prioritySelected.todos.push(thisObj);
		self.prioritySelected.showToDo = true;
    }

});