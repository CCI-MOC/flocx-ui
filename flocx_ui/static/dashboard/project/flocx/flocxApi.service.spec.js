(function() {
  "use strict";

  /**
   * @description Unit tests for the Flocx-UI API service
   */

  describe(
    'horizon.dashboard.project.flocx.service',

    function() {
      var flocxAPI, flocxBackendMockService;

      beforeEach(module('horizon.dashboard.project.flocx'));

      beforeEach(module('horizon.framework.util'));

      beforeEach(module('horizon.dashboard.project.flocx.backend-mock'));

      beforeEach(module('horizon.app.core.openstack-service-api'));

      beforeEach(inject(function ($injector) {
        flocxBackendMockService = $injector
          .get('horizon.dashboard.project.flocx.backend-mock.service');
        flocxBackendMockService.init();
      }));

      beforeEach(inject(function ($injector) {
        flocxAPI =
          $injector.get('horizon.app.core.openstack-service-api.flocx');
      }));

      it('defines the flocxAPI', function () {
        expect(flocxAPI).toBeDefined();
      });

      afterEach(function () {
        flocxBackendMockService.postTest();
      });

      describe('flocxAPI', function () {
        it('getOffers', function (done) {
          flocxAPI.getOffers()
            .then(function (offers) {
              expect(offers).toBeDefined();
              done();
            })
            .catch(fail);

          flocxBackendMockService.flush();
        });

        it('createOffer', function (done) {
          flocxAPI.createOffer(flocxBackendMockService._sampleOffers[0])
            .then(function (offer) {
              expect(offer).toBeDefined();
              done();
            })
            .catch(fail);

          flocxBackendMockService.flush();
        });

        it('getBids', function (done) {
          flocxAPI.getBids()
            .then(function (bids) {
              expect(bids).toBeDefined();
              done();
            })
            .catch(fail);

          flocxBackendMockService.flush();
        });

        it('getContracts', function (done) {
          flocxAPI.getContracts()
            .then(function (contracts) {
              expect(contracts).toBeDefined();
              done();
            })
            .catch(fail);

          flocxBackendMockService.flush();
        });
      });
    });
}());
