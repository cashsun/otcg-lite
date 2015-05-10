/**
 * Created by cashsun on 15/5/9.
 */
'use strict';
var moment = require('moment');
var DATE_FORMAT = 'DD-MMM-YYYY';
var Q = require('q');


module.exports = [
  {
    name:'generateDate',
    //index matters
    params: ['startDate', 'tenor', 'tenorUnit'],
    //must return a promise
    result: function(params){
      return Q.resolve(moment(params[0], DATE_FORMAT).add(params[1], params[2]).format(DATE_FORMAT));
    }
  }
];
