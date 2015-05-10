/**
 * Created by cashsun on 15/5/7.
 */
'use strict';

var customFunctionDefinitions = require('./customFunctionDefinitions');
var _ = require('lodash');
var SPLITTER = '!!!!';
var Q = require('q');

function getMatchToken(line, fnRegex) {
  return _.first(line.match(fnRegex));
}

function getFnRegex(fnName) {
  return new RegExp(fnName + '\\(.*\\)', 'g');
}

function getParams(line, fnRegex) {
  var matchToken = getMatchToken(line, fnRegex);

  if (matchToken) {
    var str = fnRegex.toString().split('.*')[0].replace(/\//, '').replace(/\\/, '');
    return matchToken.replace(str, '').replace('"', '').replace(/"?\)/, '').replace(/"?(\s)*"?,"?(\s)*"?/g, SPLITTER).split(SPLITTER)
  }
  return null;
}



//init customFunctions
var customFunctions = {};
customFunctionDefinitions.forEach(function(definition){
  customFunctions[definition.name] = {
    displayText: definition.name + '(' + definition.params.join(', ') + ')',
    text: definition.name + '(' + definition.params.join(', ') + ')',
    evaluate: function(line, lineNum){
      var fnRegex = getFnRegex(definition.name);
      var params = getParams(line, fnRegex);
      if (params) {
        console.log('fn: ', definition.name, params, ' line ', lineNum);
        //actual business logic happens here
        return definition.result(params).then(function(result){
          return line.replace(fnRegex, '"' + result + '"');
        });
      }
      return Q.resolve(line);
    }
  }
});

module.exports = {
  customFunctions: customFunctions,
  evaluate: function (lines) {
    return Q.all(_.map(lines, function (line, idx) {
      return _.reduce(customFunctions, function (memo, customFn) {
        return memo.then(function(newLine){
          return customFn.evaluate(newLine, idx + 1);
        });
      }, Q.resolve(line));
    })).then(function(lines){
      return lines.join('\n');
    })
  }

};


