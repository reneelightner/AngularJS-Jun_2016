'use strict';

angular.module('sampleNode')

.service('AddressService', function($resource) {
	var self = this;
	var addressResource = $resource('http://maps.googleapis.com/maps/api/geocode/json');
	self.getAddresses = function(userAddress) {
		return addressResource.get({address: userAddress}).$promise;
	};
});