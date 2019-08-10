(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx')
    .factory('horizon.dashboard.project.flocx.create-bid.service',
             createBidService);

  createBidService.$inject = [
    '$uibModal',
    'horizon.dashboard.project.flocx.basePath'
  ];

  function createBidService($uibModal, basePath) {
    var service = {
      createBid: createBid
    };
    return service;

    /**
     * @description Launch a modal dialog that will guide the user
     * in creating a new bid
     *
     * @return {promise} Object describing the created bid
     */
    function createBid () {
      var options = {
        controller: 'CreateBidController as ctrl',
        templateUrl: basePath + '/create-bid/create-bid.html'
      };
      return $uibModal.open(options).result;
    }
  }
}());
