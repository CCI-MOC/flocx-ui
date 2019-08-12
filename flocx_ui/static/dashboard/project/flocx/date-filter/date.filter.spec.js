(function () {
  'use strict';

  describe('Date Filter', function () {
    var utcToLocal, dateToUTC, nextHourString,
      lastHourString, convertToDatetime;

    beforeAll(function () {
      // Mock the Date object to use a constant time
      var baseTime = new Date(2019, 7, 2, 3, 14);
      jasmine.clock().install();
      jasmine.clock().mockDate(baseTime);
    });

    afterAll(function () {
      jasmine.clock().uninstall();
    });

    beforeEach(module('horizon.dashboard.project.flocx'));

    beforeEach(inject(function($filter) {
      utcToLocal = $filter('utcToLocal');
      dateToUTC = $filter('dateToUTC');
      nextHourString = $filter('nextHourString');
      lastHourString = $filter('lastHourString');
      convertToDatetime = $filter('convertToDatetime');
    }));

    it('filters should be defined', function () {
      expect(utcToLocal).toBeDefined();
      expect(dateToUTC).toBeDefined();
    });

    it('should mock native Date', function () {
      expect(new Date().toISOString()).toEqual('2019-08-02T07:14:00.000Z');
    });

    it('should convert date to UTC datetime string', function () {
      var date = new Date();
      var result = dateToUTC(date);
      expect(result).toEqual('2019-08-02 07:14:00');
    });

    it('should convert UTC date string to local time using the given format', function () {
      var date = new Date('2019-08-02T04:00:00.000Z'); // Note: 4:00 UTC time
      var localTime = utcToLocal(date, 'medium');
      expect(localTime).toEqual('Aug 2, 2019 12:00:00 AM');
    });

    it('should return nextHourString', function () {
      var date = new Date();
      var nextHour = nextHourString(date);
      expect(nextHour).toEqual('4:00:00 AM EDT');
    });

    it('should return lastHourString', function () {
      var date = new Date();
      var lastHour = lastHourString(date);
      expect(lastHour).toEqual('3:00:00 AM EDT');
    });

    it('should merge a date and time into a Datetime string', function () {
      var date = new Date();
      var dateString = date.toDateString();
      var timeString = nextHourString(date);
      var datetime = convertToDatetime(dateString, timeString);
      expect(datetime).toEqual('2019-08-02 08:00:00');
    });
  });
}());
