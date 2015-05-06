/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var _ = require('lodash');
var OtcgHint = require('./otcg-hint');

var EditorOptions = React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">OTC-G Lite</a>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="navbar-form">
                <button className="btn btn-default">Load Type</button>
              </li>
              <li className="navbar-form">
                <button className="btn btn-primary">Run</button>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    )
  }
});

var Editor = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    var self = this;

    //get all the keys from mapping
    function getKeys(mapping) {
      return _.chain(mapping)
        .map(function (val, key) {
          if (_.isObject(val)) {
            return _.union(getKeys(val), [key])
          } else {
            return key;
          }
        })
        .flatten()
        .filter(_.isString)
        .sort()
        .value();
    }

    var keys = getKeys(self.props.mapping);
    OtcgHint(keys);

    return {
      mappingKeys: keys,
      theme: 'neat',
      showAutoComplete: false,
      autoCompleteList: [],
      autoCompletePosition: {top: 0, left: 0}
    }
  },
  componentDidMount: function () {
    var self = this;
    var cm = CodeMirror.fromTextArea(React.findDOMNode(self.refs.myInput), {
      lineNumbers: true,
      mode: 'javascript',
      extraKeys: {"Ctrl-Space": "autocomplete"},
      tabSize: 2,
      theme: self.state.theme

    });

    this.setState({
      myCodeMirror: cm
    });

    cm.on('keyup', function(e){CodeMirror.showHint(e)});
    console.log('mapping keys', this.state.mappingKeys);
  },

  render: function () {
    return (
      <div className={'component-editor'}>
        <EditorOptions />
        <textarea defaultValue="//start typing your first mapping key below..." ref="myInput" className={'textarea-input'}></textarea>

      </div>

    )
  }

});

module.exports = Editor;
