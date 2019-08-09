(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx')
    .controller('TabNavigationController', TabNavigationController);

  TabNavigationController.$inject = [
    'horizon.dashboard.project.flocx.basePath'
  ];

  function TabNavigationController(basePath) {
    var ctrl = this;

    ctrl.active = 0;
    ctrl.tabs = [
      {
        title: 'Offers',
        path: 'node-list/node-list.html'
      },
      {
        title: 'Contracts',
        path: 'contract-list/contract-list.html'
      }
    ];

    ctrl.getUrl = getUrl;

    function getUrl (path) {
      /**
       * @description Construct a full url from a given resource path
       * @param {string} path The resource path used
       * @returns The full url of the requested resource
       */

      return basePath + path;
    }
  }
}());
