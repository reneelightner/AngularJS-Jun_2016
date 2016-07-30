(function () {

	var savedContext = {
		name: 'george'
	};

	angular.module('MyApp.Home')

	.controller('HomeController', function($state, UI_STATES, MyFactory, MyService, MyCustomUser) {
		var self = this;

		self.context = savedContext;


		self.context.name = MyCustomUser.getUserName();

		MyService.someFunction();

		console.log('HomeController created');

		self.goToUser = function(userNum) {
			console.log(userNum);
			$state.go('user-home', {id: userNum});
		};
	})
})();






