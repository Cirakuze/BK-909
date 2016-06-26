var React = require('react');
var ReactDom = require('react-dom');
var Drumset = require('./components/Drumset');
var Sequencer = require('./components/Sequencer');
var Piano = require('./components/Piano');
var vCtx, vCanvas;

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
    vCtx.fillStyle = 'rgba(200, 200, 200, 0.5)';
    vCtx.fillRect(0, 0, 400, 150);
    vCtx.lineWidth = 2;
    vCtx.strokeStyle = 'rgb(0, 0, 0)';
    vCtx.beginPath();
    var sliceWidth = 400 * 1.0 / this.bufferLength;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0;
      var y = v * 150/2;
      if(i === 0) {
        vCtx.moveTo(x, y);
      } else {
        vCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    vCtx.lineTo(400, 150/2);
    vCtx.stroke();
  },
  drawGraph: function () {
    vCtx.fillStyle = 'rgba(205, 182, 182, 0.5)';
    vCtx.fillRect(0, 0, 400, 150);
    var barWidth = (150 / this.bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i]/2;
      vCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
      vCtx.fillRect(x,150-barHeight/2,barWidth,barHeight);
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
          <Sequencer />
        </div>
        <Piano
          aCtx={this.aCtx}
          analyser={this.analyser} />
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
});
