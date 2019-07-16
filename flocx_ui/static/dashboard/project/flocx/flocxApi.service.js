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
      getOffers: getOffers
    };

    return service;

    /**
     * @description Get a list of offers
     * @return {promise} Promise containing a list of offers
     */
    function getOffers() {
      return apiService.get('/api/flocx/offer')
        .then(function (response) {
          return response.data;
        });
    }
  }
}());
