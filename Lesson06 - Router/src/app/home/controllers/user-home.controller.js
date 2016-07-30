(function () {

	angular.module('MyApp.Home')

	.controller('UserHomeController', function($stateParams) {
		var self = this;

		self.userId = $stateParams.id;

	})
})();






