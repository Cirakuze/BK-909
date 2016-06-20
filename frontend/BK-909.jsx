var React = require('react');
var ReactDom = require('react-dom');
var Drumset = require('./components/Drumset');
var Sequencer = require('./components/Sequencer');
var Piano = require('./components/Piano');
var $ = require('jquery');

$(document).keydown(function (e) {
  if (e.keyCode === 39) {
    // MOVE RIGHT TO PIANO
    $('#BK-909-PIANO').toggleClass('show-piano');
  } else if (e.keyCode === 37) {
    // MOVE LEFT TO DRUMS
    $('#BK-909-PIANO').toggleClass('show-piano');
  }
});

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
          </div>
          <Drumset />
          <Sequencer />
        </div>
        <div id="BK-909-PIANO">
          <Piano />
        </div>
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
