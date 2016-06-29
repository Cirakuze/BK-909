var Note = function (freq, aCtx, analyser) {
  this.aCtx = aCtx;
  this.analyser = analyser;
  var now = this.aCtx.currentTime;

  // INSTRUMENT 1
  this.osc1 = this.aCtx.createOscillator();
  this.osc1.type = "sine";
  this.osc1.frequency.value = freq;
  this.osc1.start(now);

  this.gain1 = this.aCtx.createGain();
  this.gain1.gain.value = 0;
  this.osc1.connect(this.gain1);

  // INSTRUMENT 2
  this.osc2 = this.aCtx.createOscillator();
  this.osc2.type = "triangle";
  this.osc2.frequency.value = freq;
  this.osc2.start(now);

  this.gain2 = this.aCtx.createGain();
  this.gain2.gain.value = 0;
  this.osc2.connect(this.gain2);

  // INSTRUMENT 3
  this.osc3 = this.aCtx.createOscillator();
  this.osc3.type = "sawtooth";
  this.osc3.frequency.value = freq;
  this.osc3.start(now);

  this.gain3 = this.aCtx.createGain();
  this.gain3.gain.value = 0;
  this.osc3.connect(this.gain3);

  // INSTRUMENT 4
  this.osc4 = this.aCtx.createOscillator();
  this.osc4.type = "square";
  this.osc4.frequency.value = freq;
  this.osc4.start(now);

  this.gain4 = this.aCtx.createGain();
  this.gain4.gain.value = 0;
  this.osc4.connect(this.gain4);

  // 8va
  this.osc8va = this.aCtx.createOscillator();
  this.osc8va.type = "sine";
  this.osc8va.frequency.value = freq * 2;
  this.osc8va.start(now);

  this.gain8va = this.aCtx.createGain();
  this.gain8va.gain.value = 0;
  this.osc8va.connect(this.gain8va);

  // 8vb
  this.osc8vb = this.aCtx.createOscillator();
  this.osc8vb.type = "sine";
  this.osc8vb.frequency.value = freq / 2;
  this.osc8vb.start(now);

  this.gain8vb = this.aCtx.createGain();
  this.gain8vb.gain.value = 0;
  this.osc8vb.connect(this.gain8vb);

  // 15mb
  this.osc8mb = this.aCtx.createOscillator();
  this.osc8mb.type = "sine";
  this.osc8mb.frequency.value = freq / 4;
  this.osc8mb.start(now);

  this.gain8mb = this.aCtx.createGain();
  this.gain8mb.gain.value = 0;
  this.osc8mb.connect(this.gain8mb);

  // ANALYSER
  this.gain1.connect(this.analyser);
  this.gain2.connect(this.analyser);
  this.gain3.connect(this.analyser);
  this.gain4.connect(this.analyser);

  this.gain8va.connect(this.analyser);
  this.gain8vb.connect(this.analyser);
  this.gain8mb.connect(this.analyser);
};

Note.prototype = {
  start: function (vols) {
    var time = this.aCtx.currentTime;
    this.gain1.gain.setValueAtTime(vols[0], time);
    this.gain2.gain.setValueAtTime(vols[1], time);
    this.gain3.gain.setValueAtTime(vols[2], time);
    this.gain4.gain.setValueAtTime(vols[3], time);

    this.gain8va.gain.setValueAtTime(vols[4] / 2, time);
    this.gain8vb.gain.setValueAtTime(vols[5] * 2, time);
    this.gain8mb.gain.setValueAtTime(vols[6] * 4, time);
  },

  stop: function () {
    var time = this.aCtx.currentTime;
    this.gain1.gain.exponentialRampToValueAtTime(0.0000000001, time);
    this.gain2.gain.exponentialRampToValueAtTime(0.0000000001, time);
    this.gain3.gain.exponentialRampToValueAtTime(0.0000000001, time);
    this.gain4.gain.exponentialRampToValueAtTime(0.0000000001, time);

    this.gain8va.gain.exponentialRampToValueAtTime(0.0000000001, time);
    this.gain8vb.gain.exponentialRampToValueAtTime(0.0000000001, time);
    this.gain8mb.gain.exponentialRampToValueAtTime(0.0000000001, time);
  }
};

module.exports = Note;
