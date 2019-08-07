(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx')
    .factory('horizon.dashboard.project.flocx.create-offer.service',
             createOfferService);

  createOfferService.$inject = [
    '$uibModal',
    'horizon.dashboard.project.flocx.basePath'
  ];

  function createOfferService($uibModal, basePath) {
    var service = {
      createOffer: createOffer
    };
    return service;

    /**
     * @description Launch a modal dialog that will guide the user
     * in creating a new offer
     *
     * @param {object} node - Node to which the offer will be associated
     * @return {promise} Object describing the created offer
     */
    function createOffer(node) {
      var options = {
        controller: 'CreateOfferController as ctrl',
        resolve: {
          node: function() {
            return node;
          }
        },
        templateUrl: basePath + '/create-offer/create-offer.html'
      };
      return $uibModal.open(options).result;
    }
  }
}());
