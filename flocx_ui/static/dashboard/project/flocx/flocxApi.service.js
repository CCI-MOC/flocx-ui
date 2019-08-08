(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.flocx', flocxAPI);

  flocxAPI.$inject = [
    'horizon.framework.util.http.service'
  ];

  /**
   * @description Service that provides access to the Flocx client API
   *
   * @param {object} apiService - HTTP service
   * @return {object} Flocx API service
   */
  function flocxAPI(apiService) {
    var service = {
      getOffers: getOffers,
      createOffer: createOffer,
      getBids: getBids,
      getContracts: getContracts
    };

    return service;

    /**
     * @description Get a list of offers
     * @return {promise} Promise containing a list of offers
     */
    function getOffers() {
      return apiService.get('/api/flocx/offer/')
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * @description Create an offer
     * @param {*} offer The offer data to be used when creating the offer
     * @returns {promise} Promise containing the created offer
     */
    function createOffer(offer) {
      return apiService.post('/api/flocx/offer/', offer)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * @description Get a list of bids
     * @returns {promise} Promise containing a list of bids
     */
    function getBids() {
      return apiService.get('/api/flocx/bid/')
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * @description Get a list of contracts
     * @return {promise} Promise containing a list of contracts
     */
    function getContracts() {
      return apiService.get('/api/flocx/contract/')
        .then(function (response) {
          return response.data;
        });
    }
  }
}());
