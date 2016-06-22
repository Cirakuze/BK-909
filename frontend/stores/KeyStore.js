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
    case "REPLAY_NOTE":
      replayNote(payload.keyName);
      KeyStore.__emitChange();
      break;
    case "REMOVE_ALL_NOTES":
      removeAllNotes();
      KeyStore.__emitChange();
      break;
  }
};

KeyStore.allNotes = function () {
  return _notes.slice();
};

var _notes = [];

function addNote(keyName) {
  if (!_notes.includes(keyName)) {
    _notes.push(keyName);
  }
}

function removeNote(keyName) {
  _notes.splice(_notes.indexOf(keyName), 1);
}

function replayNote(keyName) {
  if (_notes.includes(keyName)) {
    removeNote(keyName);
  }
  addNote(keyName);
}

function removeAllNotes() {
  _notes = [];
}

module.exports = KeyStore;
