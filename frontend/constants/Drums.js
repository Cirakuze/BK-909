var Bass = require('../util/Bass.js');
var Snare = require('../util/Snare.js');
var Toms = require('../util/Toms.js');
var HiHat = require('../util/HiHat.js');
var RideCymbal = require('../util/RideCymbal.js');
var CrashCymbal = require('../util/CrashCymbal.js');

module.exports = {
  bass: function (ctx, analyser) {
    return new Bass(ctx, analyser);
  },
  snare: function (ctx, analyser) {
    return new Snare(ctx, analyser);
  },
  hitom: function (ctx, analyser) {
    return new Toms(ctx, analyser, "high");
  },
  midtom: function (ctx, analyser) {
    return new Toms(ctx, analyser, "mid");
  },
  lowtom: function (ctx, analyser) {
    return new Toms(ctx, analyser, "low");
  },
  hihat: function (ctx, analyser) {
    return new HiHat(ctx, analyser);
  },
  ride: function (ctx, analyser) {
    return new RideCymbal(ctx, analyser);
  },
  crash: function (ctx, analyser) {
    return new CrashCymbal(ctx, analyser);
  },
  select: {
    bass: '#Right-Bass',
    snare: '#Snare',
    hitom: '#Hi-Tom',
    midtom: '#Mid-Tom',
    lowtom: '#Low-Tom',
    hihat: '#Hi-Hat',
    ride: '#Ride-Cymbal',
    crash: '#Crash-Cymbal'
  },
  toggle: {
    bass: 'bass-right-struck',
    snare: 'snare-struck',
    hitom: 'hi-tom-struck',
    midtom: 'mid-tom-struck',
    lowtom: 'low-tom-struck',
    hihat: 'hi-hat-struck',
    ride: 'ride-cymbal-struck',
    crash: 'crash-cymbal-struck'
  }
};
