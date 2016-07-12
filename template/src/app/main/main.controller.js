(function() {
  'use strict';

  angular
    .module('tempate')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var self = this;
    self.greeting = "Hello World";
  }
})();
