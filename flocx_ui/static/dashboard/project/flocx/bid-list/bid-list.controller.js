(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx')
    .controller('BidListController', BidListController);

  BidListController.$inject = [
    'horizon.app.core.openstack-service-api.flocx',
    'horizon.dashboard.project.flocx.create-bid.service'
  ];

  function BidListController(flocx, createBidService) {
    var ctrl = this;

    ctrl.createBid = createBid;
    ctrl.bids = [];

    init();

    /**
     * @description Open a modal that guides a user through creating a bid
     *
     * @returns {void}
     */
    function createBid () {
      // Open the modal
      createBidService.createBid()
        .then(init); // Refresh the bids
    }

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
