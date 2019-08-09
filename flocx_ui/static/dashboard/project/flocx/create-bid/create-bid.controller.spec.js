(function () {
  'use strict';

  describe('CreateBidController', function () {
    var ctrl;

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
      var controller = $injector.get('$controller');
      ctrl = controller('CreateBidController');
    }));

    it('controller should be defined', function () {
      expect(ctrl).toBeDefined();
    });

    it('should mock native Date', function () {
      expect(new Date().toISOString()).toEqual('2019-08-02T04:00:00.000Z');
    });

    it('controller base construction', function () {
      /**
       * Ensure that the controller can successfully set it's properties
       */
      expect(ctrl.startDate).toEqual('August 2, 2019');
      expect(ctrl.endDate).toEqual('August 9, 2019');
      expect(ctrl.startTime).toContain('12:00:00 AM');
      expect(ctrl.endTime).toContain('12:00:00 AM');
    });
  });
}());
