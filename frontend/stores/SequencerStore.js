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
      updateBank(payload.bank, payload.drum, payload.beat);
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

function updateTempo(tempo) {
  _tempos[_currentBank] = tempo;
}

var _currentBank = 1;

var _tempos = { 1: 120, 2: 120, 3: 120, 4: 120, 5: 120, 6: 120, 8: 120, 9: 120, 10: 120, 11: 120, 12: 120, 13: 100, 14: 130, 15: 120, 16: 120 };

var _banks = {
  1: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  2: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  3: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  4: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  5: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  6: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  7: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  8: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  9: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  10: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  11: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  12: {
    bass: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
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
    ride: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,
      false,false,false,false,false,false,false,false],
  },
  13: { // PRESET
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
      false,false,false,false,false,false,false,false],
  },
  14: { // PRESET
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
      false,false,false,false,false,false,false,false],
  },
  15: { // PRESET
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
      false,false,false,false,false,false,true,false],
  },
  16: { // PRESET
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
      false,false,false,false,false,false,false,false],
  },
};

module.exports = SequencerStore;
