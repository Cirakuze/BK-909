var Snare = function (ctx) {
  this.name = "snare";
  this.ctx = ctx;
};

Snare.prototype.noiseBuffer = function () {
  var bufferSize = this.ctx.sampleRate;
  var buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
  var output = buffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

Snare.prototype.setup = function () {
  this.noise = this.ctx.createBufferSource();
  this.noise.buffer = this.noiseBuffer();
  this.noiseFilter = this.ctx.createBiquadFilter();
  this.noiseFilter.type = 'highpass';
  this.noiseFilter.frequency.value = 1000;
  this.noise.connect(this.noiseFilter);

  this.noiseEnvelope = this.ctx.createGain();
  this.noiseFilter.connect(this.noiseEnvelope);
  this.noiseEnvelope.connect(this.ctx.destination);

  this.osc = this.ctx.createOscillator();
  this.osc.type = 'sine';
  this.oscEnvelope = this.ctx.createGain();

  this.osc.connect(this.oscEnvelope);
  this.oscEnvelope.connect(this.ctx.destination);
};

Snare.prototype.trigger = function (time) {
  this.setup();
  this.noiseEnvelope.gain.setValueAtTime(0.05, time);
  this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
  this.osc.frequency.setValueAtTime(250, time);
  this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.1);
  this.oscEnvelope.gain.setValueAtTime(1, time);
  this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
  this.osc.start(time);
  this.noise.start(time);
  this.osc.stop(time + 0.2);
  this.noise.stop(time + 0.2);
};

module.exports = Snare;
