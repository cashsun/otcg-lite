/**
 * Created by cashsun on 15/5/6.
 */
'use strict';

var _ = require('lodash');

module.exports = function (keyWords) {
  var Pos = CodeMirror.Pos;

  function getCompletions(token) {
    if(_.isEmpty(token.string)){
      return [];
    }

    return _.chain(keyWords).filter(function (keyWord) {
      return _.contains(keyWord, token.string);
    }).map(function (hint) {
      return {
        text: hint + ' = ',
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
