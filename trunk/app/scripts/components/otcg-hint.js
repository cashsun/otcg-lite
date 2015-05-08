/**
 * Created by cashsun on 15/5/6.
 */
'use strict';

var _ = require('lodash');
var customFunctions = require('./customFunctions').customFunctions;

module.exports = function (customKeyWords) {
  var Pos = CodeMirror.Pos;
  var allKeywords = _.union(_.keys(customFunctions), customKeyWords);

  function getCompletions(token) {
    if (_.isEmpty(token.string)) {
      return [];
    }

    return _.chain(allKeywords).filter(function (keyWord) {
      return _.contains(keyWord, token.string);
    }).map(function (hint) {
      if (customFunctions[hint]) {
        return customFunctions[hint]
      }

      return {
        text: '"' + hint + '"' + ': ',
        displayText: hint
      }
    }).value();

  }

  CodeMirror.hint.javascript = function (cm) {

    var cursor = cm.getCursor();
    var token = cm.getTokenAt(cursor);

    var inner = {from: Pos(cursor.line, token.start), to: Pos(cursor.line, token.end), list: getCompletions(token)};

    return inner;
  };

};
