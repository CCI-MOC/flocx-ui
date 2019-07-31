(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx')
    .controller('ContractListController', ContractListController);

  ContractListController.$inject = [
    'horizon.app.core.openstack-service-api.flocx',
    'horizon.dashboard.project.flocx.activeStatus',
    'horizon.dashboard.project.flocx.expiredStatus'
  ];

  function ContractListController(flocx, activeStatus, expiredStatus) {
    var ctrl = this;

    ctrl.allContracts = [];
    ctrl.contracts = [];
    ctrl.pane = activeStatus;

    ctrl.showPane = showPane;
    ctrl.activeStatus = activeStatus;
    ctrl.expiredStatus = expiredStatus;

    // Event Handlers

    function showPane (pane) {
      ctrl.pane = pane;
      filterContracts(ctrl.allContracts); // re-filter contracts
    }

    // Initialize Controllers

    init();

    function init () {
      retrieveContracts();
    }

    function retrieveContracts () {
      // Get the list of contracts from the flocx-market
      flocx.getContracts().then(onGetContracts);
    }

    function onGetContracts (contracts) {
      ctrl.allContracts = contracts;
      filterContracts(contracts); // Filter the contracts depending on the active tab
    }

    function filterContracts (contracts) {
      ctrl.contracts = contracts.filter(filter).map(function (contract) {
        contract.start_time = new Date(contract.start_time).toLocaleString();
        contract.end_time = new Date(contract.end_time).toLocaleString();
        return contract;
      });
    }

    function filter (contract) {
      if (ctrl.pane === expiredStatus) {
        return contract.status === expiredStatus;
      }
      return contract.status !== expiredStatus;
    }
  }
}());