var CrashCymbal = function (ctx, analyser) {
  this.name = "crash";
  this.ctx = ctx;
  this.analyser = analyser;
};

CrashCymbal.prototype.setup = function () {
  this.fundamental = 100;
  this.ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

  this.bandpass = this.ctx.createBiquadFilter();
  this.bandpass.type = "bandpass";
  this.bandpass.frequency.value = 8000;

  this.highpass = this.ctx.createBiquadFilter();
  this.highpass.type = "highpass";
  this.highpass.frequency.value = 3000;

  this.mixGain = this.ctx.createGain();
  this.mixGain.gain.value = 0.3;
  this.bandpass.connect(this.highpass);
  this.mixGain.connect(this.ctx.destination);

  this.mixGain.connect(this.analyser);
};

CrashCymbal.prototype.trigger = function (now) {
  this.setup();

  this.ratios.forEach(function (ratio) {
    this.osc = this.ctx.createOscillator();
    this.gain = this.ctx.createGain();

    this.highpass.connect(this.gain);
    this.gain.connect(this.mixGain);

    this.osc.type = "square";
    this.osc.frequency.value = this.fundamental * ratio;
    this.osc.connect(this.bandpass);
    this.gain.gain.setValueAtTime(0.1, now);
    this.gain.gain.linearRampToValueAtTime(0.01, now + 1.0);

    this.osc.start(now);
    this.osc.stop(now + 1.0);
  }.bind(this));
};

module.exports = CrashCymbal;
