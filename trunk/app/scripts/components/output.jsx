/** @jsx React.DOM */
'use strict';

var React = require('react');

var Output = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      theme: 'midnight',
      cm: {}
    }
  },
  componentWillReceiveProps: function (nextProps) {
    this.state.cm.getDoc().setValue(JSON.stringify(nextProps.mapping, null, 2));
  },
  componentDidMount: function () {
    var self = this;
    var myCodeMirror =
      CodeMirror.fromTextArea(React.findDOMNode(self.refs.myOutput), {
        lineNumbers: true,
        mode: {
          name: 'javascript',
          json: true
        },
        theme: self.state.theme,
        readOnly: true
      });
    self.setState({
      cm: myCodeMirror
    })
  },
  render: function () {
    return (
      <div className={"component-output"}>
        <textarea ref="myOutput" className={'textarea-output'} defaultValue="Please load an instrument type first..." ></textarea>
      </div>
    )
  }
});

module.exports = Output;
