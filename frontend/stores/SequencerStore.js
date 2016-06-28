var Store = require('flux/utils').Store;
var SequencerDispatcher = require('../dispatcher/Dispatcher');
var SequencerStore = new Store(SequencerDispatcher);
var DrumStore = require('./DrumStore');

SequencerStore.bank = function (bankNum) {
  var returnBank = {};
  Object.keys(_banks[bankNum]).forEach(function (key) {
    returnBank[key] = _banks[bankNum][key];
  });
  return returnBank;
};

SequencerStore.currentBank = function () {
  return _currentBank;
};

SequencerStore.currentTempo = function () {
  return _tempos[_currentBank];
};

SequencerStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "UPDATE_BANK":
      updateBank(payload.beat);
      this.__emitChange();
      break;
    case "UPDATE_LENGTH":
      updateLength(payload.length);
      this.__emitChange();
      break;
    case "SWITCH_BANK":
      switchBank(payload.bank);
      this.__emitChange();
      break;
    case "UPDATE_TEMPO":
      updateTempo(payload.tempo);
      this.__emitChange();
      break;
  }
};

function switchBank(bankNum) {
  _currentBank = bankNum;
}

function updateBank(beat) {
  var bank = SequencerStore.currentBank();
  var drum = DrumStore.drum().name;

  _banks[bank][drum][beat - 1] = !_banks[bank][drum][beat - 1];
}

function updateLength(length) {
  var newBeats = length * 16;
  Object.keys(_banks[_currentBank]).forEach(function (drum) {
    var oldBeats = _banks[_currentBank][drum].length;
    if (newBeats == oldBeats) {
      // console.log("NO CHANGE");
    } else if (newBeats > oldBeats) {
      var last16 = _banks[_currentBank][drum].slice(-16);
      _banks[_currentBank][drum] =
        _banks[_currentBank][drum]
          .concat(last16);
      // console.log(_banks[_currentBank][drum]);
    } else if (newBeats < oldBeats) {
      _banks[_currentBank][drum]
        .splice(-(oldBeats - newBeats));
      // console.log(_banks[_currentBank][drum]);
    }
  });
}

function updateTempo(tempo) {
  _tempos[_currentBank] = tempo;
}

var _currentBank = 1;

var _instruments = ["bass", "snare", "hihat", "hitom", "midtom", "lowtom", "ride", "crash"];

function emptyBank(beats) {
  var newBank = {};
  _instruments.forEach(function (drum) {
    newBank[drum] = new Array(beats).fill(false);
  });
  return newBank;
}

var _tempos = { 1: 120, 2: 120, 3: 120, 4: 120, 5: 120, 6: 120, 8: 120, 9: 120, 10: 120, 11: 120, 12: 120, 13: 120, 14: 120, 15: 120, 16: 240 };

var _banks = {
  1: { // PRESET
    bass: [true,false,false,false,false,false,false,false,
      true,false,false,false,false,false,false,false],
    snare: [false,false,false,false,true,false,false,false,
      false,false,false,false,true,false,false,false],
    hihat: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    hitom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    lowtom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    ride: [false,false,true,true,false,true,true,false,
      true,true,false,true,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,true,false]
  },
  2: { // PRESET
    bass: [true,false,false,false,true,false,false,false,
      true,false,false,false,true,false,false,false],
    snare: [false,false,false,true,false,true,false,false,
      true,false,false,true,false,false,true,false],
    hihat: [true,true,true,false,true,false,true,true,
      false,true,true,false,true,true,false,true],
    hitom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    lowtom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false]
  },
  3: { // PRESET
    bass: [true,true,false,true,false,true,true,false,
      true,true,false,true,false,true,true,false],
    snare: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    hihat: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    hitom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    lowtom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    ride: [false,true,true,false,false,false,true,true,
      false,false,true,true,false,true,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false]
  },
  4: { // PRESET
    bass: [true,false,false,false,false,false,false,false,
      true,false,false,false,false,false,false,false],
    snare: [false,false,false,false,true,false,false,false,
      false,false,false,false,true,false,false,false],
    hihat: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    hitom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    lowtom: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    ride: [false,false,true,false,false,false,true,false,
      false,false,true,false,false,false,true,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false]
  },
  5: emptyBank(64),
  6: emptyBank(64),
  7: emptyBank(64),
  8: emptyBank(64),
  9: emptyBank(64),
  10: emptyBank(64),
  11: emptyBank(64),
  12: emptyBank(64),
  13: emptyBank(64),
  14: emptyBank(64),
  15: emptyBank(64),
  16: {
    bass: new Array(64).fill(true),
    snare: [true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false],
    hihat: new Array(64).fill(false),
    hitom: new Array(64).fill(false),
    midtom: new Array(64).fill(false),
    lowtom: new Array(64).fill(false),
    ride: [true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false,
      true,false,true,false,true,false,true,false],
    crash: new Array(56).fill(false).concat(
      [true,false,false,false,true,false,false,false]
    )
  }
};

module.exports = SequencerStore;
