/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var _ = require('lodash');

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


var AutoCompletor = React.createClass({
  render: function () {

    var myStyle = {
      top: this.props.position.top+5,
      left: this.props.position.left
    };

    return (
      <div className="component-autocompletor" style={myStyle}>
        hehe
      </div>
    )
  }
});

var Editor = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    var self = this;

    //get all the keys from mapping
    function getKeys(mapping) {
      return _.chain(mapping).map(function (val, key) {
        if (_.isObject(val)) {
          return _.union(getKeys(val), [key])
        } else {
          return key;
        }
      }).flatten().filter(_.isString).value();
    }

    return {
      mappingKeys: getKeys(self.props.mapping),
      theme: 'neat',
      showAutoComplete: false,
      autoCompleteList: [],
      cursorCoords: {top: 0, left: 0}
    }
  },
  componentDidMount: function () {
    var self = this;
    var myCodeMirror = window.CodeMirror.fromTextArea(React.findDOMNode(self.refs.myInput), {
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
      theme: self.state.theme

    });
    this.setState({
      myCodeMirror: myCodeMirror
    });

    myCodeMirror.on('change', _.bind(this.onInputChange, this));
    console.log('mapping keys', this.state.mappingKeys);
  },

  render: function () {
    return (
      <div className={'component-editor'}>
        <EditorOptions />
        <textarea defaultValue="//start typing 'mapping.' here..." ref="myInput" className={'textarea-input'}></textarea>
        {this.state.showAutoComplete ? <AutoCompletor position={this.state.autoCompletePosition} contents={this.state.autoCompleteList}/> : null }
      </div>

    )
  },
  onInputChange: function () {

    var lineHeight = this.state.myCodeMirror.defaultTextHeight();
    var autoCompletePosition = this.state.myCodeMirror.cursorCoords();
    autoCompletePosition.top += lineHeight;

    this.setState({
      showAutoComplete: true,
      autoCompletePosition: autoCompletePosition
    })
  }

});

module.exports = Editor;
