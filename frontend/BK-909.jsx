var React = require('react');
var ReactDom = require('react-dom');
var Drumset = require('./components/Drumset');
var Sequencer = require('./components/Sequencer');
var Piano = require('./components/Piano');
var vCtx, vCanvas, height, width;

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
    this.dataArray = new Uint8Array(this.bufferLength);
  },
  drawLine: function () {
    vCtx.fillStyle = 'rgba(220, 221, 200, 0.5)';
    vCtx.fillRect(0, 0, width, height);
    vCtx.lineWidth = 2;
    vCtx.strokeStyle = 'rgb(0, 0, 0)';
    vCtx.beginPath();
    var sliceWidth = width * 1.0 / this.bufferLength;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0;
      var y = v * height/2;
      if(i === 0) {
        vCtx.moveTo(x, y);
      } else {
        vCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    vCtx.lineTo(width, height/2);
    vCtx.stroke();
  },
  drawGraph: function () {
    vCtx.fillStyle = 'rgba(220, 221, 200, 0.5)';
    vCtx.fillRect(0, 0, width, height);
    var barWidth = (width / this.bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i]/2;
      vCtx.fillStyle = 'rgba(' + (barHeight+50) + ', 221, 200, 0.5)';
      vCtx.fillRect(x,height-barHeight/2,barWidth,barHeight);
      x += barWidth + 1;
    }
  },
  componentDidMount: function () {
    setInterval(function () {
      this.analyser.getByteTimeDomainData(this.dataArray);
      this.drawLine();
      this.drawGraph();
    }.bind(this), 1);
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
        <canvas id="visualizer-canvas"></canvas>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDom.render(
    <App />,
    document.getElementById('root')
  );

  vCanvas = document.getElementById("visualizer-canvas");
  vCtx = vCanvas.getContext("2d");

  height = 150;
  width = window.innerWidth;
});
