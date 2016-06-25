var vCtx, vCanvas;

document.addEventListener("DOMContentLoaded", function () {
  vCanvas = document.getElementById("visualizer-canvas");
  vCtx = vCanvas.getContext("2d");
});

var aCtx = new (window.AudioContext || window.webkitAudioContext)();

var Note = function (freq) {
  this.analyser = aCtx.createAnalyser();
  this.analyser.fftSize = 2048;
  this.bufferLength = this.analyser.frequencyBinCount;
  this.dataArray = new Uint8Array(this.bufferLength);

  // INSTRUMENT 1
  this.osc1 = aCtx.createOscillator();
  this.osc1.type = "sine";
  this.osc1.frequency.value = freq;
  this.osc1.start(aCtx.currentTime);

  this.gain1 = aCtx.createGain();
  this.gain1.gain.value = 0;
  this.osc1.connect(this.gain1);

  // INSTRUMENT 2
  this.osc2 = aCtx.createOscillator();
  this.osc2.type = "triangle";
  this.osc2.frequency.value = freq;
  this.osc2.start(aCtx.currentTime);

  this.gain2 = aCtx.createGain();
  this.gain2.gain.value = 0;
  this.osc2.connect(this.gain2);

  // INSTRUMENT 3
  this.osc3 = aCtx.createOscillator();
  this.osc3.type = "sawtooth";
  this.osc3.frequency.value = freq;
  this.osc3.start(aCtx.currentTime);

  this.gain3 = aCtx.createGain();
  this.gain3.gain.value = 0;
  this.osc3.connect(this.gain3);

  // INSTRUMENT 4
  this.osc4 = aCtx.createOscillator();
  this.osc4.type = "square";
  this.osc4.frequency.value = freq;
  this.osc4.start(aCtx.currentTime);

  this.gain4 = aCtx.createGain();
  this.gain4.gain.value = 0;
  this.osc4.connect(this.gain4);

  // ANALYSER
  this.gain1.connect(this.analyser);
  this.gain2.connect(this.analyser);
  this.gain3.connect(this.analyser);
  this.gain4.connect(this.analyser);

  this.analyser.connect(aCtx.destination);
};

Note.prototype = {
  start: function (vols) {
    this.gain1.gain.value = vols[0];
    this.gain2.gain.value = vols[1];
    this.gain3.gain.value = vols[2];
    this.gain4.gain.value = vols[3];

    this.analyser.getByteTimeDomainData(this.dataArray);
  },

  stop: function () {
    this.gain1.gain.value = 0;
    this.gain2.gain.value = 0;
    this.gain3.gain.value = 0;
    this.gain4.gain.value = 0;
  }
};

module.exports = Note;
