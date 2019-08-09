(function() {
  'use strict';

  /**
   * Controller used to create an offer for a specified node
   */
  angular
    .module('horizon.dashboard.project.flocx')
    .controller('CreateOfferController', CreateOfferController);

  CreateOfferController.$inject = [
    '$filter',
    '$uibModalInstance',
    'horizon.app.core.openstack-service-api.flocx',
    'horizon.dashboard.project.flocx.hourRegex',
    'horizon.dashboard.project.flocx.costRegex',
    'horizon.dashboard.project.flocx.defaultOfferDaysDifference',
    'horizon.dashboard.project.flocx.defaultOfferCost',
    'horizon.framework.widgets.toast.service',
    'node'
  ];

  function CreateOfferController($filter,
                                $uibModalInstance,
                                flocx,
                                hourRegex,
                                costRegex,
                                offerDaysDifference,
                                offerCost,
                                toastService,
                                node) {
    var ctrl = this;

    // Import filters from date.filter.js
    var nextHourString = $filter('nextHourString');
    var convertToDatetime = $filter('convertToDatetime');

    var localeOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    };
    var today = new Date();
    var endDateMs = (new Date()).setDate(today.getDate() + offerDaysDifference);
    var endDate = new Date(endDateMs);
    var todayString = today.toLocaleDateString(undefined, localeOptions);
    var endDateString = endDate.toLocaleDateString(undefined, localeOptions);
    var todayTimeString = nextHourString(today);
    var endDateTimeString = nextHourString(endDate);
    var config = node.properties;

    ctrl.name = node.name || node.uuid;
    ctrl.startDate = todayString;
    ctrl.endDate = endDateString;
    ctrl.startTime = todayTimeString;
    ctrl.endTime = endDateTimeString;
    ctrl.config = JSON.stringify(config, undefined, 2);
    ctrl.cost = offerCost;

    ctrl.defaultCost = offerCost;
    ctrl.hourPattern = hourRegex;
    ctrl.costPattern = costRegex;

    /**
     * @description Display a notification when an offer creation error occurs
     * @param {*} err The error text to be displayed
     *
     * @return {void}
     */
    function displayOfferCreationError (err) {
      toastService.add('error', 'Failed to create offer. ' + err);
    }

    /**
     * Create the defined offer
     *
     * @return {promise} A promise that resolves when the offer is created
     */
    ctrl.createOffer = function() {
      var offer;

      try {
        var propertiesJSON = JSON.parse(ctrl.config);
        propertiesJSON.floor_price = ctrl.cost;

        offer = {
          resource_type: 'ironic_node',
          resource_uuid: node.uuid,
          start_date: convertToDatetime(ctrl.startDate, ctrl.startTime),
          end_date: convertToDatetime(ctrl.endDate, ctrl.endTime),
          properties: propertiesJSON
        };
      } catch (err) {
        return displayOfferCreationError(err);
      }

      // Attempt to create the offer
      return flocx.createOffer(offer)
        .then(function (createdOffer) {
          $uibModalInstance.close(createdOffer);
        })
        .catch(function (error) {
          displayOfferCreationError(error.data);
        });
    };
  }
}());
