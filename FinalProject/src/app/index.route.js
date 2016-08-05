(function() {
  'use strict';

  angular
    .module('template')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, UI_STATES) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'ctrl'
      }).state('main.map', {
        url: 'map',
        templateUrl: 'app/map/map.html',
        controller: 'MapController',
        controllerAs: 'mapctrl'
      }).state('main.grid', {
        url: 'grid',
        templateUrl: 'app/grid/grid.html',
        controller: 'GridController',
        controllerAs: 'gridctrl'
      });

    $urlRouterProvider.otherwise('/map');
  }

})();
