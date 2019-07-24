(function () {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx.backend-mock', [])
    .factory('horizon.dashboard.project.flocx.backend-mock.service',
      flocxBackendMockService);

  flocxBackendMockService.$inject = [
    '$httpBackend'
  ];

  /**
   * @description Service that provides a mock for the Flocx backend.
   * @param {*} $httpBackend Angular backend mock
   *
   * @return {void}
   */
  function flocxBackendMockService($httpBackend) {
    var responseCode = {
      SUCCESS: 200,
      CREATED: 201,
      BAD_REQUEST: 400,
      RESOURCE_NOT_FOUND: 404,
      UNAUTHORIZED: 403
    };

    var sampleOffers = [
      {
        marketplace_offer_id: "b711b1ca-a77e-4392-a9b5-dc84c4f469ac",
        provider_offer_id: "90894712-3b21-4bf7-9899-b4234530ff8b",
        provider_id: "b9752cc0-9bed-4f1c-8917-12ade7a6fdbe",
        creator_id: "12a59a51-b4d6-497d-9f75-f56c409305c8",
        marketplace_date_created: "(2016-07-16T19:20:30-04:00)",
        status: "available",
        server_id: "fb878e3e-9425-4285-babf-0e58a7b091b2",
        start_time: "(2016-07-16T19:20:30-04:00)",
        end_time: "(2016-08-16T19:20:30-04:00)",
        server_config: {
          properties: {
            memory_gb: 10240,
            cpu_arch: "x86_64",
            cpu_physical_count: 4,
            cpu_core_count: 16,
            cpu_gz: 3,
            disks: [
              {
                size_gb: 500,
                model: "YOYODYNE 1234"
              },
              {
                size_gb: 1024,
                model: "evo840 ssd"
              }
            ]
          }
        },
        cost: 11
      }
    ];

    var service = {
      init: init,
      flush: flush,
      postTest: postTest
    };

    return service;

    /**
     * @description Initialize the backend-mock service and create the handlers
     *    that intercept http requests.
     *
     * @return {void}
     */
    // eslint-disable-next-line no-unused-vars
    function init () {

      // Get offers
      $httpBackend.whenGET('/api/flocx/offer')
        .respond(responseCode.SUCCESS, sampleOffers);
    }

    /**
     * @description Flush pending requests
     *
     * @return {void}
     */
    // eslint-disable-next-line no-unused-vars
    function flush () {
      $httpBackend.flush();
    }

    /**
     * @description Post test verifications.
     *    This function should be called after completion of a unit test.
     *
     * @return {void}
     */
    // eslint-disable-next-line no-unused-vars
    function postTest () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }
  }
}());
