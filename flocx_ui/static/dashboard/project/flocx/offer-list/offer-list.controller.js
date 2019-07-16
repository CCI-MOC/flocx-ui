(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx', [])
    .controller('FlocxOfferListController', FlocxOfferListController);

  FlocxOfferListController.$inject = [
    'horizon.app.core.openstack-service-api.flocx'
  ];

  function FlocxOfferListController(flocx) {
    var ctrl = this;

    ctrl.offers = [];

    init();

    function init () {
      retrieveOffers();
    }

    function retrieveOffers () {
      // Get the list of offers from the flocx-market
      flocx.getOffers().then(onGetOffers);
    }

    function onGetOffers (offers) {
      ctrl.offers = offers.map(function (offer) {
        var startTime = offer.start_time.slice(1, -1); // get rid of parenthesis
        var endTime = offer.end_time.slice(1, -1); // get rid of parenthesis
        offer.start_time = new Date(startTime).toLocaleString();
        offer.end_time = new Date(endTime).toLocaleString();
        return offer;
      });
    }
  }
}());
