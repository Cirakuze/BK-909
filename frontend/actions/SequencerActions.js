var BankDispatcher = require('../dispatcher/Dispatcher');

module.exports = {
  updateBank: function (beatNum) {
    BankDispatcher.dispatch({
      actionType: "UPDATE_BANK",
      beat: beatNum
    });
  },
  updateLength: function (newLength) {
    BankDispatcher.dispatch({
      actionType: "UPDATE_LENGTH",
      length: newLength
    });
  },
  switchBank: function (bankNum) {
    BankDispatcher.dispatch({
      actionType: "SWITCH_BANK",
      bank: bankNum
    });
  },
  updateTempo: function (newTempo) {
    BankDispatcher.dispatch({
      actionType: "UPDATE_TEMPO",
      tempo: newTempo
    });
  }
};
