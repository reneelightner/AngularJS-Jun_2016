'use strict';

angular.module('sampleNode')

.controller('MainCtrl', function(AddressService) {
  var self = this;
  self.addresses = [];

  self.onAddressChange = function(address) {
    AddressService.getAddresses(address).then(function(response) {
      self.addresses = response.results;
    });
  };

});