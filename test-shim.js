// eslint-disable-next-line no-unused-vars
var horizonPlugInModules = [];

(function (globals) {
  'use strict';

  var django = globals.django || (globals.django = {});

  django.pluralidx = function (count) { return count === 1 ? 0 : 1; };

  /* gettext identity library */

  django.gettext = function (msgid) { return msgid; };
  django.ngettext = function (singular, plural, count) { return count === 1 ? singular : plural; };
  django.gettext_noop = function (msgid) { return msgid; };
  django.pgettext = function (_context, msgid) { return msgid; };
  django.npgettext = function (_context, singular, plural, count) {
    return count === 1 ? singular : plural;
  };

  django.interpolate = function (fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function (match) { return String(obj[match.slice(2,-2)]); });
    } else {
      return fmt.replace(/%s/g, function () { return String(obj.shift()); });
    }
  };

  /* formatting library */

  django.formats = {
    DATETIME_FORMAT: "N j, Y, P",
    DATETIME_INPUT_FORMATS: [
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d",
      "%m/%d/%Y %H:%M:%S",
      "%m/%d/%Y %H:%M:%S.%f",
      "%m/%d/%Y %H:%M",
      "%m/%d/%Y",
      "%m/%d/%y %H:%M:%S",
      "%m/%d/%y %H:%M:%S.%f",
      "%m/%d/%y %H:%M",
      "%m/%d/%y"
    ],
    DATE_FORMAT: "N j, Y",
    DATE_INPUT_FORMATS: [
      "%Y-%m-%d",
      "%m/%d/%Y",
      "%m/%d/%y"
    ],
    DECIMAL_SEPARATOR: ".",
    FIRST_DAY_OF_WEEK: "0",
    MONTH_DAY_FORMAT: "F j",
    NUMBER_GROUPING: "3",
    SHORT_DATETIME_FORMAT: "m/d/Y P",
    SHORT_DATE_FORMAT: "m/d/Y",
    THOUSAND_SEPARATOR: ",",
    TIME_FORMAT: "P",
    TIME_INPUT_FORMATS: [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M"
    ],
    YEAR_MONTH_FORMAT: "F Y"
  };

  django.get_format = function (formatType) {
    var value = django.formats[formatType];
    if (typeof value === 'undefined') {
      return formatType;
    } else {
      return value;
    }
  };

  /* add to global namespace */
  globals.pluralidx = django.pluralidx;
  globals.gettext = django.gettext;
  globals.ngettext = django.ngettext;
  globals.gettext_noop = django.gettext_noop;
  globals.pgettext = django.pgettext;
  globals.npgettext = django.npgettext;
  globals.interpolate = django.interpolate;
  globals.STATIC_URL = '/static/';
  globals.WEBROOT = '/';
}(this));
