/** @jsx React.DOM */
'use strict';

var React = require('react');
var Editor = require('./editor');
var Output = require('./output');
var GibnApi = require('./gibnApi');
var _ = require('lodash');

var MainPanel = React.createClass({
  getInitialState: function () {
    return {
      mapping: {}
    }
  },
  onLoadType: function(instrumentType){
    var definition = GibnApi.getDefinitionByType(instrumentType);

    console.log('loading type', instrumentType, definition);
    this.setState({
      mapping: definition
    });
  },
  render: function () {
    return <div>
      <Editor mapping={this.state.mapping} onLoadType={_.bind(this.onLoadType, this)}/>
      <Output mapping={this.state.mapping}/>
    </div>
  }
});
module.exports = MainPanel;
