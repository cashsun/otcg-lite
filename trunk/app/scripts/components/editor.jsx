/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var _ = require('lodash');
var setupAutocomplete = require('./otcg-hint');
var evaluate = require('./customFunctions').evaluate;



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

var EditorOptions = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      instrumentType: ''
    }
  },
  render: function () {
    return (
      <nav className="navbar navbar-default component-editor-options">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Coffee Bin</a>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="navbar-form">
                <div className="input-group">
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={this.onLoadType}>Load Type</button>
                  </span>
                  <input onKeyUp={this.onKeyUp} type="text" className="form-control" valueLink={this.linkState('instrumentType')}/>
                </div>
              </li>
              <li className="navbar-form btn-group">
                <button className="btn btn-default btn-grind" onClick={this.onGrind}>Grind</button>
                <button className="btn btn-primary">Make Coffee</button>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    )
  },
  onGrind: function (e) {
    e.preventDefault();
    this.props.onGrind();
  },

  onKeyUp: function (e) {

    if (e.keyCode === 13) {
      this.onLoadType(e);
      return
    }
    e.preventDefault();
  },

  onLoadType: function (e) {
    e.preventDefault();
    var instrumentType = this.state.instrumentType;
    this.props.onLoadType(instrumentType);
  }


});

var Editor = React.createClass({

  getInitialState: function () {
    var self = this;
    var keys = getKeys(self.props.mapping);
    setupAutocomplete(keys);

    return {
      mappingKeys: keys,
      theme: 'neat',
      showAutoComplete: false,
      autoCompleteList: [],
      autoCompletePosition: {top: 0, left: 0}
    }
  },
  componentWillReceiveProps: function (nextProps) {
    var keys = getKeys(nextProps.mapping);
    setupAutocomplete(keys);
    this.state.cm.getDoc().setValue('//start typing your mapping key below. Ctrl + D: delete word, Ctrl + G: Grind');
  },
  componentDidMount: function () {
    var self = this;
    var cm = CodeMirror.fromTextArea(React.findDOMNode(self.refs.myInput), {
      lineNumbers: true,
      mode: {name: 'javascript', json: true},
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
        'Ctrl-G': function(cm){
          self.onGrind();
        },
        'Ctrl-D': function (cm) {
          var cursor = cm.getCursor();
          var token = cm.getTokenAt(cursor);
          cm.getDoc().replaceRange('', CodeMirror.Pos(cursor.line, token.start),CodeMirror.Pos(cursor.line, token.end));
        }
      },
      tabSize: 2,
      theme: self.state.theme

    });

    this.setState({
      cm: cm
    });

    cm.on('change', function (e) {
      CodeMirror.showHint(e)
    });
    console.log('mapping keys', this.state.mappingKeys);
  },

  render: function () {
    return (
      <div className={'component-editor'}>
        <EditorOptions onLoadType={this.props.onLoadType} onGrind={this.onGrind}/>
        <textarea defaultValue="//load a instrument type first..." ref="myInput" className={'textarea-input'}></textarea>
      </div>
    )
  },

  onGrind: function () {
    var doc = this.state.cm.getDoc();
    var result = evaluate(doc.getValue().split('\n'));
    console.log('result', result);
    doc.setValue(result);
  }

});


module.exports = Editor;
