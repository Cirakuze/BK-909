var React = require('react');
var ReactDom = require('react-dom');
var Drumset = require('./components/Drumset');
var Sequencer = require('./components/Sequencer');

var App = React.createClass({
  render: function () {
    return (
      <div className="app">
        <div className="header">
          <h1 className="title">
            JS-909
          </h1>
          <p className="inspiration">Inspired by TR-909</p>
          <p className="creation">created by
          <a target="_blank" href="http://www.bada.kim"> Bada Kim</a></p>
        </div>
        <Drumset />
        <Sequencer />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDom.render(
    <App />,
    document.getElementById('root')
  );
});
