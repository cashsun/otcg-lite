/** @jsx React.DOM */
'use strict';

var React = require('react');
var Editor = require('./editor');
var Output = require('./output');

var MainPanel = React.createClass({
  getInitialState:function(){
    return {
      mapping: {
        map1: 123,
        map2: 'a',
        map3: ['c','d','e'],
        map4: {
          map5: 'b'
        }
      }
    }
  },
  render: function(){
    return <div>
            <Editor mapping={this.state.mapping} onRunMapping={this.onRunMapping}/>
            <Output mapping={this.state.mapping}/>
      </div>
  },

  onRunMapping: function(nextMapping){
    this.setState({
      mapping: nextMapping
    });
  }
});
module.exports = MainPanel;
