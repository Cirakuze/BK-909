var Dispatch = require('../dispatcher/Dispatcher.js');

var KeyAction = {
  keyPressed: function (keyName) {
    Dispatch.dispatch({
      actionType: "ADD_NOTE",
      keyName: keyName
    });
  },
  keyDepressed: function (keyName) {
    Dispatch.dispatch({
      actionType: "REMOVE_NOTE",
      keyName: keyName
    });
  },
  replaceNotes: function (notes) {
    Dispatch.dispatch({
      actionType: "REPLACE_NOTES",
      notes: notes
    });
  }
};

module.exports = KeyAction;
