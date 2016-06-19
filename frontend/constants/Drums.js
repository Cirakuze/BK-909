var Bass = require('../util/Bass.js');
var Snare = require('../util/Snare.js');
var Toms = require('../util/Toms.js');
var HiHat = require('../util/HiHat.js');
var RideCymbal = require('../util/RideCymbal.js');
var CrashCymbal = require('../util/CrashCymbal.js');

module.exports = {
  bass: function (ctx) {
    return new Bass(ctx);
  },
  snare: function (ctx) {
    return new Snare(ctx);
  },
  hitom: function (ctx) {
    return new Toms(ctx, "high");
  },
  midtom: function (ctx) {
    return new Toms(ctx, "mid");
  },
  lowtom: function (ctx) {
    return new Toms(ctx, "low");
  },
  hihat: function (ctx) {
    return new HiHat(ctx);
  },
  ride: function (ctx) {
    return new RideCymbal(ctx);
  },
  crash: function (ctx) {
    return new CrashCymbal(ctx);
  }
};
