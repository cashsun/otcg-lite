/** @jsx React.DOM */
'use strict';

var React = require('react');
var Editor = require('./editor');


var Index = React.createClass({
  render: function(){
    return <div>
            <Editor />

    </div>
  }
});
module.exports = Index;
