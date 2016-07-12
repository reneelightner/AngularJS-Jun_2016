(function() {
  'use strict';

  angular
    .module('tempate')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
