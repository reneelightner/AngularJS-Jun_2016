var myModule = angular.module("MyApp", []).controller('MyController', function(Utilities, Student){

	this.assignment;
	this.score;

	this.student = new Student();

	this.addAssignment = function() {
		this.student.addAssignment(this.assignment, this.score);
    }

    this.removeAssignment = function(item) {
    	this.student.removeAssignment(item);
	};


}).service('Utilities', function() {

	this.calcAve = function(arrOfAssignments){
		var allScores = 0;
		var howManyScores = 0;
		angular.forEach(arrOfAssignments, function(value, key){
			allScores = allScores+parseInt(value.score);
			howManyScores = key+1;
	    });
	    return allScores/howManyScores;
	};

	this.calcGrade = function(average){
		if(average <= 100 && average>=90){
			return "A";
		}else if(average < 90 && average>=80){
			return "B";
		}else if(average < 80 && average>=70){
			return "C";
		}else if(average < 70 && average>=60){
			return "D";
		}else{
			return "F";
		}
	};

	this.calcPassed = function(grade){
		var passed = grade == "F" ? "Fail" : "Passed";
		return passed;
	};

}).factory('Student', function(Utilities) {

	function Student(){

		this.userName = "Renee Lightner";

		this.allAssignments = [];

		this.average;
		this.grade;
		this.passed;

	}

	Student.prototype.addAssignment = function(name, score) {
		var objAssignment = {};
		objAssignment.assignment = name;
		objAssignment.score = score;
		this.allAssignments.push(objAssignment);
		this.average = Utilities.calcAve(this.allAssignments);
		this.grade = Utilities.calcGrade(this.average);
		this.passed = Utilities.calcPassed(this.grade);
	};

	Student.prototype.removeAssignment = function(item) {
		//find the index the assignment you're removing in this.allAssignments
    	var index = this.allAssignments.indexOf(item);
    	this.allAssignments.splice(index,1);
    	this.average = Utilities.calcAve(this.allAssignments);
		this.grade = Utilities.calcGrade(this.average);
		this.passed = Utilities.calcPassed(this.grade);
	};

	return Student; //factory needs to return something

});

//data model for student grade calculator AKA factory
//name -- string
//assignments -- array manipulating
//average manipulating
//grade manipulating
//passed manipulating

//what functions will help me in manipulating?...AKA sercive (or utility functions)
//setAverage(arrOfAssignments) //returns average
//setGrade(average) //returns a grade
//setPassed(grade) //returns true or false

//these also go in the factory
//removeAssignment //will also setAverage setGrade setPassed
//addAssignment //will also setAverage setGrade setPassed