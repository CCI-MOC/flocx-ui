(function () {
  'use strict';

  angular
      .module('horizon.dashboard.project.flocx')
      .filter('utcToLocal', utcToLocal) // to convert the mysql datetime utc to local time
      .filter('dateToUTC', dateToUTC); // to convert a date to a datetime string for mysql

  utcToLocal.$inject = [
    '$filter'
  ];

  /**
   * @description An angular filter to convert a utc time to local
   * @param {*} $filter The angular $filter formatter
   *
   * @returns {function} The constructed utcToLocal filter
   */
  function utcToLocal($filter) {
    return function (utcDate, format, timezone) {
      if (!utcDate) {
        return utcDate;
      }

      // append 'Z' to the date string to indicate UTC time if the timezone isn't already specified
      if (typeof utcDate === 'string' &&
          utcDate.indexOf('Z') === -1 &&
          utcDate.indexOf('+') === -1) {
        utcDate += 'Z';
      }

      return $filter('date')(utcDate, format, timezone);
    };
  }

  dateToUTC.$inject = [
    '$filter'
  ];

  /**
   * @description An angular filter to convert a date to a utc datetime string
   * @param {*} $filter The angular $filter formatter
   *
   * @returns {function} The constructed localToUtc filter
   */
  function dateToUTC($filter) {
    return function (localDate) {
      var format = 'yyyy-MM-dd HH:mm:ss';
      var timezone = 'utc';

      return $filter('date')(localDate, format, timezone);
    };
  }
}());
