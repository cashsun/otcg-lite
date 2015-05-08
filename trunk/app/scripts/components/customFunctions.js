/**
 * Created by cashsun on 15/5/7.
 */

var _ = require('lodash');
var moment = require('moment');
var SPLITTER = '||||';
var DATE_FORMAT = 'DD-MMM-YYYY';

var regex = {
  generateDate: /generateDate\(.*\)/g
};

var customFunctions = {
  generateDate: {
    displayText: 'generateDate(startDate, tenor, tenorUnit)',//auto complete pop up menu text
    text: 'generateDate(startDate, tenor, tenorUnit)', //actual replacement text
    evaluate:function(line, lineNum){
      console.log(line, lineNum);
      //caveat: same function only allowed once each line?...
      var match = _.first(line.match(regex.generateDate));
      if(match){
        var params = getParams(match, regex.generateDate);
        console.log('fn: ', 'generateDate', params);
        var result = moment(params[0], DATE_FORMAT).add(params[1], params[2]).format(DATE_FORMAT);
        return line.replace(regex.generateDate, '"'+result+'"');
      }
      return line;

    }
  }
};

function getParams(matchToken, fnRegex){
  var str = fnRegex.toString().split('.*')[0].replace(/\//,'').replace(/\\/,'');
  return matchToken.replace(str, '').replace('"','').replace(/"?\)/,'').replace(/"?(\s)*"?,"?(\s)*"?/g, SPLITTER).split(SPLITTER)
}


module.exports = {
  customFunctions: customFunctions,
  evaluate: function(lines){
    return _.chain(lines).map(function(line, idx){
      return _.reduce(customFunctions, function(memo, customFn){
        return customFn.evaluate(memo, idx+1)
      }, line)
    }).value().join('\n');
  }

};

