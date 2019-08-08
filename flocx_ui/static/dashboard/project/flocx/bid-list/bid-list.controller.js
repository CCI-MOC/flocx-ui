(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx')
    .controller('BidListController', BidListController);

  BidListController.$inject = [
    'horizon.app.core.openstack-service-api.flocx'
  ];

  function BidListController(flocx) {
    var ctrl = this;

    ctrl.bids = [];

    init();

    function init () {
      retrieveBids();
    }

    function retrieveBids () {
      // Get the list of contracts from the flocx-market
      flocx.getBids().then(onGetBids);
    }

    function onGetBids (bids) {
      ctrl.bids = bids;
    }
  }
}());
