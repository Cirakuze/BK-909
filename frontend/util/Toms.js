var pitches = {
  high: 350,
  mid: 300,
  low: 250
};

var names = {
  high: "hitom",
  mid: "midtom",
  low: "lowtom"
};

var Toms = function (ctx, analyser, pitch) {
  this.name = names[pitch];
  this.ctx = ctx;
  this.analyser = analyser;
  this.pitch = pitches[pitch];
};

Toms.prototype.setup = function() {
  this.osc = this.ctx.createOscillator();
  this.gain = this.ctx.createGain();
  this.osc.connect(this.gain);
  this.gain.connect(this.analyser);

  this.osc2 = this.ctx.createOscillator();
  this.gain2 = this.ctx.createGain();
  this.osc2.connect(this.gain2);
  this.gain2.connect(this.analyser);

  this.osc3 = this.ctx.createOscillator();
  this.gain3 = this.ctx.createGain();
  this.osc3.connect(this.gain3);
  this.gain3.connect(this.analyser);
};

Toms.prototype.trigger = function(time) {
  this.setup();

  this.osc.frequency.setValueAtTime(this.pitch, time);
  this.gain.gain.setValueAtTime(0.1, time);
  this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 1.00);
  this.gain.gain.exponentialRampToValueAtTime(0.0000000001, time + 1.00);

  this.osc2.frequency.setValueAtTime(this.pitch - 15, time);
  this.gain2.gain.setValueAtTime(0.1, time);
  this.osc2.frequency.exponentialRampToValueAtTime(0.01, time + 0.75);
  this.gain2.gain.exponentialRampToValueAtTime(0.0000000001, time + 0.75);

  this.osc3.frequency.setValueAtTime(this.pitch - 25, time);
  this.gain3.gain.setValueAtTime(0.1, time);
  this.osc3.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
  this.gain3.gain.exponentialRampToValueAtTime(0.0000000001, time + 0.5);

  this.osc.start(time);
  this.osc.stop(time + 1.00);

  this.osc2.start(time);
  this.osc2.stop(time + 0.75);

  this.osc3.start(time);
  this.osc3.stop(time + 0.5);
};

module.exports = Toms;
