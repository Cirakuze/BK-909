var DrumDispatcher = require('../dispatcher/Dispatcher');

module.exports = {
  receiveDrum: function (newDrum) {
    DrumDispatcher.dispatch({
      actionType: "RECEIVE_DRUM",
      drum: newDrum
    });
  }
};
