(function() {
  'use strict';

  /**
   * Controller used to create a bid
   */
  angular
    .module('horizon.dashboard.project.flocx')
    .controller('CreateBidController', CreateBidController);

  CreateBidController.$inject = [
    '$filter',
    '$uibModalInstance',
    'horizon.app.core.openstack-service-api.flocx',
    'horizon.dashboard.project.flocx.hourRegex',
    'horizon.dashboard.project.flocx.defaultBidDaysDifference',
    'horizon.dashboard.project.flocx.defaultBidQuantity',
    'horizon.dashboard.project.flocx.quantityRegex',
    'horizon.dashboard.project.flocx.defaultBidCost',
    'horizon.dashboard.project.flocx.costRegex',
    'horizon.dashboard.project.flocx.baseNode',
    'horizon.dashboard.project.flocx.availableBidStatus',
    'horizon.framework.widgets.toast.service'
  ];

  function CreateBidController($filter,
                               $uibModalInstance,
                               flocx,
                               hourRegex,
                               bidDaysDifference,
                               defaultQuantity,
                               quantityPattern,
                               defaultCost,
                               costPattern,
                               baseNode,
                               availableBidStatus,
                               toastService) {
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
    var endDateMs = (new Date()).setDate(today.getDate() + bidDaysDifference);
    var endDate = new Date(endDateMs);
    var todayString = today.toLocaleDateString(undefined, localeOptions);
    var endDateString = endDate.toLocaleDateString(undefined, localeOptions);
    var todayTimeString = nextHourString(today);
    var endDateTimeString = nextHourString(endDate);

    ctrl.startDate = todayString;
    ctrl.endDate = endDateString;
    ctrl.startTime = todayTimeString;
    ctrl.endTime = endDateTimeString;
    ctrl.hourPattern = hourRegex;
    ctrl.quantity = defaultQuantity;
    ctrl.quantityPattern = quantityPattern;
    ctrl.cost = defaultCost;
    ctrl.costPattern = costPattern;

    var operators = [
      {
        name: 'Numeric operators',
        options: [ '==', '!=', '>', '<', '>=', '<=' ]
      },
      {
        name: 'String operators',
        options: [ 'eq', 'ne', 'startswith', 'endswith', 'matches' ]
      },
      {
        name: 'List operators',
        options: [ 'in', 'contains' ]
      }
    ];

    /** Convert `operators` to a format for Angular to read
     *
     * This will change it from an array of objects
     * containing arrays to an array of objects
     */
    ctrl.operators = operators.map(function (operator) {
      return operator.options.map(function (option) {
        return {
          group: operator.name,
          option: option
        };
      });
    }).reduce(function (arr, objects) {
      return arr.concat(objects);
    }, []);

    ctrl.match_criteria = baseNode;
    ctrl.addRow = addRow;
    ctrl.removeRow = removeRow;
    ctrl.createBid = createBid;

    /**
     * @description Add a row to the ctrl.match_critera
     *
     * @returns {void}
     */
    function addRow () {
      ctrl.match_criteria.push(['', '==', '']);
    }

    /**
     * @description Remove a row from the ctrl.match_criteria
     * @param {number} index The index to be removed from the criteria
     *
     * @returns {void}
     */
    function removeRow (index) {
      ctrl.match_criteria.splice(index, 1);
    }

    /**
     * @description Determine if a string or array of strings is/are empty
     * @param {*} stringLikeVar A string-like variable or array of string-like variables
     *
     * @returns {boolean} Whether the input is empty
     */
    function isNotEmpty (stringLikeVar) {
      if (Array.isArray(stringLikeVar)) {
        return stringLikeVar.every(isNotEmpty);
      }

      return stringLikeVar.toString().length > 0;
    }

    /**
     * @description Filter out criteria that are empty
     * @param {*} criteria An array of criteria
     *
     * @returns {*} A filtered list of the criteria by whether or not they are empty
     */
    function filterEmptyCriteria (criteria) {
      return criteria.filter(isNotEmpty).map(function (criterion) {
        return Array.from(criterion); // Array.from gets rid of Angular properties like `$$hashKey`
      });
    }

    /**
     * @description Display a notification when a bid creation error occurs
     * @param {*} err The error text to be displayed
     *
     * @return {void}
     */
    function displayBidCreationError (err) {
      toastService.add('error', 'Failed to create bid. ' + err);
    }

    /**
     * Create the defined bid
     *
     * @return {promise} A promise that resolves when the bid is created
     */
    function createBid () {
      var bid;

      try {
        bid = {
          server_quantity: +ctrl.quantity,
          start_time: convertToDatetime(ctrl.startDate, ctrl.startTime),
          end_time: convertToDatetime(ctrl.endDate, ctrl.endTime),
          status: availableBidStatus,
          duration: 10, // duration is not used right now
          server_config_query: {
            specs: filterEmptyCriteria(ctrl.match_criteria)
          },
          cost: +ctrl.cost
        };
      } catch (err) {
        return displayBidCreationError(err);
      }

      // Attempt to create the bid
      return flocx.createBid(bid)
        .then(function (createdBid) {
          $uibModalInstance.close(createdBid);
        })
        .catch(function (error) {
          displayBidCreationError(error.data);
        });
    }
  }
}());
