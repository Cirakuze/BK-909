var React = require('react');
var Dispatcher = require('../dispatcher/Dispatcher.js');
var Store = require('flux/utils').Store;
var Tones = require('../constants/Tones.js');
var Note = require('../util/Note.js');
var KeyAction = require('../actions/KeyActions.js');
var KeyStore = new Store(Dispatcher);

KeyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ADD_NOTE":
      addNote(payload.keyName);
      KeyStore.__emitChange();
      break;
    case "REMOVE_NOTE":
      removeNote(payload.keyName);
      KeyStore.__emitChange();
      break;
    case "REPLACE_NOTES":
      replaceNotes(payload.notes);
      KeyStore.__emitChange();
      break;
  }
};

KeyStore.allNotes = function () {
  return _notes.slice();
};

var _notes = [];

var addNote = function (keyName) {
  if (!_notes.includes(keyName)) {
    _notes.push(keyName);
  }
};

var removeNote = function (keyName) {
  var idx = _notes.indexOf(keyName);
  _notes.splice(idx, 1);
};

var replaceNotes = function (notes) {
  _notes = notes;
};

module.exports = KeyStore;
