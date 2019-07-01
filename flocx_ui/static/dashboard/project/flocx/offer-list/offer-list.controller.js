(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx', [])
    .controller('FlocxOfferListController', FlocxOfferListController);

  FlocxOfferListController.$inject = [ '$http' ];

  function FlocxOfferListController() {
    var ctrl = this;

    ctrl.items = [
      { name: 'abc', id: 123 },
      { name: 'efg', id: 345 },
      { name: 'hij', id: 678 }
    ];
  }
})();
