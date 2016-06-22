var Dispatcher = require('../dispatcher/Dispatcher.js');

var KeyAction = {
  keyPressed: function (keyName) {
    Dispatcher.dispatch({
      actionType: "ADD_NOTE",
      keyName: keyName
    });
  },
  keyDepressed: function (keyName) {
    Dispatcher.dispatch({
      actionType: "REMOVE_NOTE",
      keyName: keyName
    });
  },
  removeAllNotes: function () {
    Dispatcher.dispatch({
      actionType: "REMOVE_ALL_NOTES"
    });
  }
};

module.exports = KeyAction;
