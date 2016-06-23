var ctx = new (window.AudioContext || window.webkitAudioContext)();

var Note = function (freq) {
  // INSTRUMENT ONE
  this.osc1 = ctx.createOscillator();
  this.osc1.type = "sine";
  this.osc1.frequency.value = freq;
  this.osc1.start(ctx.currentTime);

  this.gain1 = ctx.createGain();
  this.gain1.gain.value = 0;
  this.osc1.connect(this.gain1);
  this.gain1.connect(ctx.destination);

  // INSTRUMENT TWO
  this.osc2 = ctx.createOscillator();
  this.osc2.type = "triangle";
  this.osc2.frequency.value = freq;
  this.osc2.start(ctx.currentTime);

  this.gain2 = ctx.createGain();
  this.gain2.gain.value = 0;
  this.osc2.connect(this.gain2);
  this.gain2.connect(ctx.destination);

  // INSTRUMENT 3
  this.osc3 = ctx.createOscillator();
  this.osc3.type = "sawtooth";
  this.osc3.frequency.value = freq;
  this.osc3.start(ctx.currentTime);

  this.gain3 = ctx.createGain();
  this.gain3.gain.value = 0;
  this.osc3.connect(this.gain3);
  this.gain3.connect(ctx.destination);

  // INSTRUMENT 4
  this.osc4 = ctx.createOscillator();
  this.osc4.type = "square";
  this.osc4.frequency.value = freq;
  this.osc4.start(ctx.currentTime);

  this.gain4 = ctx.createGain();
  this.gain4.gain.value = 0;
  this.osc4.connect(this.gain4);
  this.gain4.connect(ctx.destination);

};

Note.prototype = {
  start: function (vols) {
    this.gain1.gain.value = vols[0];
    this.gain2.gain.value = vols[1];
    this.gain3.gain.value = vols[2];
    this.gain4.gain.value = vols[3];
  },

  stop: function () {
    this.gain1.gain.value = 0;
    this.gain2.gain.value = 0;
    this.gain3.gain.value = 0;
    this.gain4.gain.value = 0;
  }
};

module.exports = Note;
