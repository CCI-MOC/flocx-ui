(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @ngname horizon.dashboard.project.flocx
   *
   * @description
   * Provides all of the services and widgets required
   * to support and display Ironic related content.
   */
  angular
    .module('horizon.dashboard.project.flocx', [])
    .config(config);

  config.$inject = ['$provide', '$windowProvider'];

  function config($provide, $windowProvider) {
    $provide.constant('horizon.dashboard.project.flocx.activeStatus', 'active');

    $provide.constant('horizon.dashboard.project.flocx.expiredStatus', 'expired');

    $provide.constant('horizon.dashboard.project.flocx.hourRegex', /^\d{1,2} [aApP][mM]$/);

    $provide.constant('horizon.dashboard.project.flocx.costRegex', /^\d{1,3}$/);

    $provide.constant('horizon.dashboard.project.flocx.defaultOfferDaysDifference', 7);

    $provide.constant('horizon.dashboard.project.flocx.defaultOfferCost', 10);

    var path = $windowProvider.$get().STATIC_URL + 'dashboard/project/flocx/';
    $provide.constant('horizon.dashboard.project.flocx.basePath', path);
  }
}());
