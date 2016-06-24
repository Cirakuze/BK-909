var React = require('react');
var ReactDom = require('react-dom');
var Drumset = require('./components/Drumset');
var Sequencer = require('./components/Sequencer');
var Piano = require('./components/Piano');

var App = React.createClass({
  render: function () {
    return (
      <div className="app">
        <div id="BK-909-DRUMS">
          <div className="header">
            <h1 className="title">
              BK-909
            </h1>
            <p className="inspiration">Inspired by TR-909</p>
            <p className="creation">created by
            <a target="_blank" href="http://www.bada.kim"> Bada Kim</a></p>
            <p className="BK-909 clearfix">
              <a target="_blank" href="https://github.com/Cirakuze/BK-909">BK-909 GitHub Repo -</a>
              <a target="_blank" href="http://www.bada.kim">- Portfolio -</a>
              <a target="_blank" href="https://www.linkedin.com/in/badatjkim">- LinkedIn</a>
            </p>
          </div>
          <Drumset />
          <Sequencer />
        </div>
        <Piano />
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
