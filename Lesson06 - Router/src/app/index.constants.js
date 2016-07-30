/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('template')
    .value('MY_VALUE', 'ABD')
    .constant('UI_STATES', {
    	HOME: 'home',
    	CONTACTS: 'contacts',
    	STORE: 'store'
    })

    .factory('MyFactory', function() {
    	function Car() {

    	}

    	return Car;
    })

    .service('MyService', function() {
    	var self = this;

    	self.someFunction = function() {

    	};
    })

    .provider('MyCustomUser', function() {
    	var self = this;
    	var userName = '';

    	self.setUserName = function(newUser) {
    		userName = newUser;
    	};

    	self.$get = function() {
    		return {
    			getUserName: function() {
    				return userName;
    			}
    		}
    	}
    })    

})();
