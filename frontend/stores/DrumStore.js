var Store = require('flux/utils').Store;
var DrumDispatcher = require('../dispatcher/Dispatcher');
var DrumStore = new Store(DrumDispatcher);
var _drum = {};
// NOTE Drumset.jsx on mount will set _drum to a bass drum.

DrumStore.drum = function () {
  var returnDrum = {};
  Object.keys(_drum).forEach(function (key) {
    returnDrum[key] = _drum[key];
  });
  return returnDrum;
};

DrumStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "RECEIVE_DRUM":
      receiveDrum(payload.drum);
      this.__emitChange();
      break;
  }
};

DrumStore.empty = function () {
  return (Object.keys(_drum).length > 0) ? false : true;
};

function receiveDrum(drum) {
  _drum = drum;
}

module.exports = DrumStore;
