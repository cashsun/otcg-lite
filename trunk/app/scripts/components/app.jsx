/** @jsx React.DOM */
'use strict';
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
//var NotFoundRoute = Router.NotFoundRoute;
//var Redirect = Router.Redirect;
//var Backbone = require('backbone');
var Index = require('./index');


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState:function(){
    return  {
      user:{
        fn: 'Cash',
        sn: 'Sun'
      }
    }
  },
  render: function(){
    return (
      <div className={"component-app"}>
        <div className={"component-main"}>
          <RouteHandler user={this.state.user}/>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>

  </Route>
);

module.exports = {
  run: function () {
    Router.run(routes, Router.HistoryLocation, function (Handler) {
      React.render(<Handler/>, document.getElementById('app'));
    });
  }
};
