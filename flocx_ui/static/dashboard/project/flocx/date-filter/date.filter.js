(function () {
  'use strict';

  angular
      .module('horizon.dashboard.project.flocx')
      .filter('utcToLocal', utcToLocal) // to convert the mysql datetime utc to local time
      .filter('dateToUTC', dateToUTC) // to convert a date to a datetime string for mysql
      .filter('nextHourString', nextHourString) // to round to the next hour
      .filter('lastHourString', lastHourString) // to round to the last hour
      .filter('convertToDatetime', convertToDatetime); // converts strings to datetime format

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

  var hourStringLocaleOptions = {
    hour: 'numeric',
    minute: '2-digit'
  };

  nextHourString.$inject = [];

  /**
   * @description Get the next hour after a given date as a string of the form: [hh AM/PM]
   *
   * @returns {string} A string interpretation of the next hour
   */
  function nextHourString () {
    return function (date) {
      date.setHours(date.getHours() + Math.ceil(date.getMinutes() / 60));
      date.setMinutes(0);

      var timeString = date.toLocaleTimeString([], hourStringLocaleOptions);
      return timeString;
    };
  }

  lastHourString.$inject = [];

  /**
   * @description Get the last hour after a given date as a string of the form: [hh AM/PM]
   * NOTE: This will return the current hour even if it is exactly on the hour.
   * For example, calling lastHourString with a time of 4:00 will return 4:00
   *
   * @returns {string} A string interpretation of the last hour
   */
  function lastHourString () {
    return function (date) {
      date.setMinutes(0);

      var timeString = date.toLocaleTimeString([], hourStringLocaleOptions);
      return timeString;
    };
  }

  convertToDatetime.$inject = [
    '$filter'
  ];

  /**
   * @description Convert a JavaScript date string and time string to a MySQL compatible format
   * @param {*} $filter The angular $filter formatter
   *
   * @returns {string} A MySQL compatible datetime string
   */
  function convertToDatetime ($filter) {
    return function (dateString, timeString) {
      var modifiedTimeString = timeString;

      // Add `:00` to the time (from 9 AM to 9:00 AM) to make it compatible with JavaScript Date
      if (timeString.indexOf(':00') === -1) {
        modifiedTimeString = timeString.slice(0, -3) + ':00' + timeString.slice(-3);
      }

      var compatibleDate = dateString + ' ' + modifiedTimeString;

      return dateToUTC($filter)(new Date(compatibleDate));
    };
  }
}());
