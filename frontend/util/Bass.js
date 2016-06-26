var Bass = function (ctx, analyser) {
  this.name = "bass";
  this.ctx = ctx;
  this.analyser = analyser;
};

Bass.prototype.setup = function() {
  this.osc = this.ctx.createOscillator();
  this.osc.type = "sine";
  this.gain1 = this.ctx.createGain();
  this.osc.connect(this.gain1);
  this.gain1.connect(this.ctx.destination);

  this.osc2 = this.ctx.createOscillator();
  this.osc2.type = "sine";
  this.gain2 = this.ctx.createGain();
  this.osc2.connect(this.gain2);
  this.gain2.connect(this.ctx.destination);

  this.gain1.connect(this.analyser);
  this.gain2.connect(this.analyser);
};

Bass.prototype.trigger = function(time) {
  this.setup();

  this.gain1.gain.setValueAtTime(1, time);
  this.gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
  this.osc.frequency.setValueAtTime(60, time);
  this.osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);

  this.gain2.gain.setValueAtTime(1, time);
  this.gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
  this.osc2.frequency.setValueAtTime(50, time);
  this.osc2.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);

  this.osc.start(time);
  this.osc.stop(time + 0.5);

  this.osc2.start(time);
  this.osc2.stop(time + 0.5);
};

module.exports = Bass;
