var myModule = angular.module("MyApp", []);

myModule.controller('MyController', function(){

	var self = this;

	/*tried to use this*/
	self.themesArray = [{
			label: 'Default',
			theme: 'defaultTheme'
		}, {
			label: 'Yellow',
			theme: 'yellowTheme'
		}, {
			label: 'Green',
			theme: 'greenTheme'
		}, {
			label: 'Red',
			theme: 'redTheme'
		}, {
			label: 'Blue',
			theme: 'blueTheme'
		}
	];

	var lightBlue = "#99ccff";
	var lightRed = "#ff6666";
	var lightGreen = "#33cc66";
	var lightYellow = "#ffff99";
	var lightGray = "#ccc";
	var gray = "#666";

	self.yellowTheme = {
		body: "yellow",
		firstDiv:"red",
		secondDiv:lightRed,
		text:lightBlue
	};
	self.greenTheme = {
		body: "green",
		firstDiv:"yellow",
		secondDiv:lightYellow,
		text:lightRed
	};
	self.redTheme = {
		body: "red",
		firstDiv:"green",
		secondDiv:lightGreen,
		text:lightYellow
	};
	self.blueTheme = {
		body: "blue",
		firstDiv:lightGray,
		secondDiv:lightBlue,
		text:gray
	};
	self.defaultTheme = {
		body: false,
		firstDiv:gray,
		secondDiv:lightGray,
		"text": false
	};

	self.themeSelected = self.defaultTheme;

});