/** @jsx React.DOM */
'use strict';

var React = require('react');

var Output = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState:function(){
    return  {
      myOutput: JSON.stringify(this.props.mapping, null, 4),
      theme: 'midnight'
    }
  },
  componentDidMount:function(){
    var self = this;
    //var myCodeMirror =
    CodeMirror.fromTextArea(React.findDOMNode(self.refs.myOutput), {
      lineNumbers: true,
      mode: {
        name: 'javascript',
        json: true
      },
      theme: self.state.theme,
      readOnly: true
    });
  },
  render: function(){
    var self = this;
    var description = '//Definition...\n';
    return (
      <div className={"component-output"}>
        <textarea ref="myOutput" className={'textarea-output'} defaultValue={description + self.state.myOutput}></textarea>
      </div>
    )
  }
});

module.exports = Output;
