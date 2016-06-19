var HiHat = function (ctx) {
  this.name ="hihat";
  this.ctx = ctx;
};

HiHat.prototype.setup = function () {
  this.fundamental = 40;
  this.ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

  this.bandpass = this.ctx.createBiquadFilter();
  this.bandpass.type = "bandpass";
  this.bandpass.frequency.value = 10000;

  this.highpass = this.ctx.createBiquadFilter();
  this.highpass.type = "highpass";
  this.highpass.frequency.value = 7000;

  this.mixGain = this.ctx.createGain();
  this.mixGain.gain.value = 0.3;
  this.bandpass.connect(this.highpass);
  this.mixGain.connect(this.ctx.destination);


};

HiHat.prototype.trigger = function (now) {
  this.setup();

  this.ratios.forEach(function (r) {
    this.osc = this.ctx.createOscillator();
    this.gain = this.ctx.createGain();

    this.highpass.connect(this.gain);
    this.gain.connect(this.mixGain);

    this.osc.type = "square";
    this.osc.frequency.value = this.fundamental * r;
    this.osc.connect(this.bandpass);
    this.gain.gain.setValueAtTime(0.1, now);
    this.gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    this.osc.start(now);
    this.osc.stop(now + 0.05);
  }.bind(this));
};

module.exports = HiHat;
