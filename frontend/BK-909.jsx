var React = require('react');
var ReactDom = require('react-dom');
var Drumset = require('./components/Drumset');
var Sequencer = require('./components/Sequencer');
var Piano = require('./components/Piano');
var linesHeight, linesWidth,
    graphHeight, graphWidth,
    oscope, oscopeCtx,
    freGraph, freGraphCtx;

document.addEventListener("DOMContentLoaded", function () {
  ReactDom.render(
    <App />,
    document.getElementById('root')
  );

  oscope = document.getElementById("oscilloscope");
  oscopeCtx = oscope.getContext("2d");
  freGraph = document.getElementById("frequencyGraph");
  freGraphCtx = freGraph.getContext("2d");

  linesHeight = 75;
  linesWidth = window.innerWidth;
  graphHeight = 50;
  graphWidth = window.innerWidth;
});

var App = React.createClass({
  getInitialState: function () {
    this.setup();
    return ({
      color: true
    });
  },
  setup: function () {
    this.aCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.aCtx.createAnalyser();
    this.analyser.connect(this.aCtx.destination);

    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;

    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    // this.times = new Uint8Array(this.analyser.frequencyBinCount);
  },
  drawLine: function () {
    // this.analyser.getByteTimeDomainData(this.times);
    //
    // oscopeCtx.fillwStyle = 'rgba(220, 221, 200, 0.5)';
    // oscopeCtx.fillRect(0, 0, linesWidth, linesHeight);
    // oscopeCtx.lineWidth = 1.5;
    // oscopeCtx.beginPath();
    // var sliceWidth = linesWidth * 1.0 / this.bufferLength;
    // var x = 0;
    // for(var i = 0; i < this.bufferLength; i++) {
    //   var v = this.times[i] / 128.0;
    //   var y = v * linesHeight/8;
    //   if(i === 0) {
    //     oscopeCtx.moveTo(x, y);
    //   } else {
    //     oscopeCtx.lineTo(x, y);
    //   }
    //   x += sliceWidth / 6;
    // }
    // oscopeCtx.lineTo(linesWidth, linesHeight/2);
    // oscopeCtx.stroke();
  },
  drawGraph: function () {
    this.analyser.getByteFrequencyData(this.freqs);

    freGraphCtx.fillStyle = 'rgba(220, 221, 200, 0.5)';
    freGraphCtx.fillRect(0, 0, graphWidth, graphHeight);
    var barWidth = (graphWidth / this.bufferLength) * 1.0;
    var barHeight;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      barHeight = this.freqs[i]/2;
      var rgb = this.rgbfy(i * 8);
      var roy = rgb[0], gee = rgb[1], biv = rgb[2];
      freGraphCtx.fillStyle = 'rgba(' + roy + ', ' + gee + ', ' + biv + ', 0.5)';
      freGraphCtx.fillRect(x,graphHeight-barHeight/2,barWidth,barHeight);
      x += barWidth + 0.025;
    }
  },
  rgbfy: function (num) {
    while (num > 2040) {num = num % 2040;}

    var roy = 0, gee = 0, biv = 0;
    if (num >= 1785) { // rgb(255, 255, 255);
      roy = 255; gee = 255 - (Math.floor(num % 255)); biv = 255;
    } else if (num >= 1530) { // rgb(255, 0, 255);
      roy = 255; gee = 0; biv = 255 - (Math.floor(num % 255));
    } else if (num >= 1275) { // rgb(0, 0, 255);
      roy = 0 + (Math.floor(num % 255)); gee = 0; biv = 255;
    } else if (num >= 1020) { // rgb(0, 255, 255);
      roy = 0; gee = 255 - (Math.floor(num % 255)); biv = 255;
    } else if (num >= 765) { // rgb(0, 255, 0);
      roy = 0; gee = 255; biv = 0 + (Math.floor(num % 255));
    } else if (num >= 510) { // rgb(255, 255, 0);
      roy = 255 - (Math.floor(num % 255)); gee = 255; biv = 0;
    } else if (num >= 255) { // rgb(255, 0, 0);
      roy = 255; gee = 0 + (Math.floor(num % 255)); biv = 0;
    } else if (num >= 0) { // rgb(0, 0, 0);
      roy = 0 + (Math.floor(num % 255)); gee = 0; biv = 0;
    }

    return [roy, gee, biv];
  },
  componentDidMount: function () {
    this.analyser.smoothingTimeConstant = 0.8;
    this.analyser.fftSize = 1024;
    this.analyser.minDecibels = -140;
    this.analyser.maxDecibels = 50;

    setInterval(function () {
      this.drawGraph();
    }.bind(this), 30);
  },
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
          <Drumset
            aCtx={this.aCtx}
            analyser={this.analyser} />
          <Sequencer
            aCtx={this.aCtx}
            analyser={this.analyser} />
        </div>
        <Piano
          aCtx={this.aCtx}
          analyser={this.analyser} />
        <canvas id="oscilloscope"></canvas>
        <canvas id="frequencyGraph"></canvas>
      </div>
    );
  }
});
