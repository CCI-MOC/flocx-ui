(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx')
    .controller('OfferListController', OfferListController);

  OfferListController.$inject = [
    'horizon.app.core.openstack-service-api.flocx'
  ];

  function OfferListController(flocx) {
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
        offer.start_time = new Date(offer.start_time).toLocaleString();
        offer.end_time = new Date(offer.end_time).toLocaleString();
        return offer;
      });
    }
  }
}());
