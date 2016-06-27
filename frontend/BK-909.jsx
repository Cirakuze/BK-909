var React = require('react');
var ReactDom = require('react-dom');
var Drumset = require('./components/Drumset');
var Sequencer = require('./components/Sequencer');
var Piano = require('./components/Piano');
var height, width, oscope, oscopeCtx, freGraph, freGraphCtx;

document.addEventListener("DOMContentLoaded", function () {
  ReactDom.render(
    <App />,
    document.getElementById('root')
  );

  oscope = document.getElementById("oscilloscope");
  oscopeCtx = oscope.getContext("2d");
  freGraph = document.getElementById("frequencyGraph");
  freGraphCtx = freGraph.getContext("2d");

  height = 10;
  width = window.innerWidth;
});

var App = React.createClass({
  getInitialState: function () {
    this.setup();
    return ({});
  },
  setup: function () {
    this.aCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.aCtx.createAnalyser();
    this.analyser.connect(this.aCtx.destination);

    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;

    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    this.times = new Uint8Array(this.analyser.frequencyBinCount);
  },
  drawLine: function () {
    this.analyser.getByteTimeDomainData(this.times);
    // console.log(this.times);
    // for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    //   var value = this.times[i];
    //   var percent = value / 256;
    //   var height = height * percent;
    //   var offset = height - height - 1;
    //   var barWidth = width/this.analyser.frequencyBinCount;
    //   oscopeCtx.fillStyle = 'red';
    //   oscopeCtx.fillRect(i * barWidth, offset, 1, 2);
    // }

    oscopeCtx.fillStyle = 'rgba(220, 221, 200, 0.5)';
    oscopeCtx.fillRect(0, 0, width, height);
    oscopeCtx.lineWidth = 2;
    oscopeCtx.strokeStyle = 'rgb(0, 0, 0)';
    oscopeCtx.beginPath();
    var sliceWidth = width * 1.0 / this.bufferLength;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      var v = this.times[i] / 128.0;
      var y = v * height/2;
      if(i === 0) {
        oscopeCtx.moveTo(x, y);
      } else {
        oscopeCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    oscopeCtx.lineTo(width, height/2);
    oscopeCtx.stroke();
  },
  drawGraph: function () {
    this.analyser.getByteFrequencyData(this.freqs);
    // console.log(this.freqs);
    // for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    //   var value = this.freqs[i];
    //   var percent = value / 256;
    //   var height = height * percent;
    //   var offset = height - height - 1;
    //   var barWidth = width/this.analyser.frequencyBinCount;
    //   var hue = i/this.analyser.frequencyBinCount * 360;
    //   freGraphCtx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    //   freGraphCtx.fillRect(i * barWidth, offset, barWidth, height);
    // }

    freGraphCtx.fillStyle = 'rgba(220, 221, 200, 0.5)';
    freGraphCtx.fillRect(0, 0, width, height);
    var barWidth = (width / this.bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      barHeight = this.freqs[i]/2;
      freGraphCtx.fillStyle = 'rgba(' + (barHeight+50) + ', 221, 200, 0.5)';
      freGraphCtx.fillRect(x,height-barHeight/2,barWidth,barHeight);
      x += barWidth + 1;
    }
  },
  componentDidMount: function () {
    // this.analyser.smoothingTimeConstant = 0.8;
    // this.analyser.fftSize = 2048;
    // this.analyser.minDecibels = -140;
    // this.analyser.maxDecibels = 0;
    //
    // setInterval(function () {
    //   this.drawLine();
    //   this.drawGraph();
    // }.bind(this), 1);
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
