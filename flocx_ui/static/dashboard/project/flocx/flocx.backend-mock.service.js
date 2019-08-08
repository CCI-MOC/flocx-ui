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

    var sampleBids = [
      {
        marketplace_bid_id: "8f9d6482-e308-41af-acef-5a415a636d5d",
        project_id: "4d02370751104210bc5de88a4d9898f5",
        server_quantity: 80,
        start_time: "2019-07-24T13:59:14",
        end_time: "2019-07-24T13:59:14",
        duration: 16400,
        status: "active",
        server_config_query: {
          foo: "bar"
        },
        cost: 11.0,
        created_at: "2019-08-01T16:56:34",
        updated_at: "2019-08-07T18:24:18"
      }
    ];

    var sampleContracts = [
      {
        contract_id: "b711b1ca-a77e-4392-abcd-dc84c4f469ac",
        time_created: "(2016-07-16T19:20:30-04:00)",
        bid_id: "b711b1ca-a77e-4392-abcd-dc84c4f469ac",
        offers: [
          "b711b1ca-a77e-4392-abcd-dc84c4f46900",
          "b711b1ca-a77e-4392-abcd-dc84c4f46901",
          "b711b1ca-a77e-4392-abcd-dc84c4f46902",
          "b711b1ca-a77e-4392-abcd-dc84c4f46915"
        ],
        start_time: "(2016-07-16T19:20:30-04:00)",
        end_time: "(2016-08-16T19:20:30-04:00)",
        cost: 11,
        status: "matched"
      }
    ];

    var service = {
      init: init,
      flush: flush,
      postTest: postTest,
      _sampleOffers: sampleOffers,
      _sampleContracts: sampleContracts
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
      $httpBackend.whenGET('/api/flocx/offer/')
        .respond(responseCode.SUCCESS, sampleOffers);

      // Create offer
      $httpBackend.whenPOST('/api/flocx/offer/')
        .respond(responseCode.SUCCESS, sampleOffers[0]);

      // Get bids
      $httpBackend.whenGET('/api/flocx/bid/')
        .respond(responseCode.SUCCESS, sampleBids);

      // Get contracts
      $httpBackend.whenGET('/api/flocx/contract/')
        .respond(responseCode.SUCCESS, sampleContracts);
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
