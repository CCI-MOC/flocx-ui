(function () {
  'use strict';

  describe('CreateOfferController', function () {
    var flocxBackendMockService, ironicBackendMockService, ctrl, sampleNode;

    beforeAll(function () {
      // Mock the Date object to use a constant time
      jasmine.clock().install();
      var baseTime = new Date(2019, 7, 2);
      jasmine.clock().mockDate(baseTime);
    });

    afterAll(function () {
      // Remove the date mocks
      jasmine.clock().uninstall();
    });

    beforeEach(module('horizon.dashboard.project.flocx'));

    beforeEach(module('horizon.dashboard.admin.ironic'));

    beforeEach(module('horizon.dashboard.project.flocx.backend-mock'));

    beforeEach(module('horizon.framework.util'));

    beforeEach(module(function($provide) {
      $provide.value('$uibModalInstance', {});
    }));

    beforeEach(module(function($provide) {
      $provide.value('horizon.framework.widgets.toast.service',
                     {});
    }));

    beforeEach(module('horizon.app.core.openstack-service-api'));

    beforeEach(inject(function($injector) {
      flocxBackendMockService =
        $injector.get('horizon.dashboard.project.flocx.backend-mock.service');
      flocxBackendMockService.init();

      ironicBackendMockService =
        $injector.get('horizon.dashboard.admin.ironic.backend-mock.service');
      ironicBackendMockService.init();

      var ironicAPI =
        $injector.get('horizon.app.core.openstack-service-api.ironic');
      ironicAPI.createNode(
        { driver: ironicBackendMockService.params.defaultDriver })
        .then(function(response) {
          sampleNode = response.data;
          var controller = $injector.get('$controller');
          ctrl = controller('CreateOfferController', {
            node: sampleNode
          });
        });

      ironicBackendMockService.flush();
    }));

    afterEach(function() {
      flocxBackendMockService.postTest();
    });

    it('controller should be defined', function () {
      expect(ctrl).toBeDefined();
    });

    it('should mock native Date', function () {
      expect(new Date().toISOString()).toEqual('2019-08-02T04:00:00.000Z');
    });

    it('controller base construction', function () {
      /**
       * Ensure that the controller can successfully set it's properties based on
       * the inputted node
       */
      expect(ctrl.name).toEqual(sampleNode.uuid);
      expect(ctrl.startDate).toEqual('August 2, 2019');
      expect(ctrl.endDate).toEqual('August 9, 2019');
      expect(ctrl.startTime).toContain('12:00:00 AM');
      expect(ctrl.endTime).toContain('12:00:00 AM');
    });
  });
}());
