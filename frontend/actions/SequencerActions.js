var BankDispatcher = require('../dispatcher/Dispatcher');

module.exports = {
  updateBank: function (bankNum, drumName, beatNum) {
    BankDispatcher.dispatch({
      actionType: "UPDATE_BANK",
      bank: bankNum,
      drum: drumName,
      beat: beatNum
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
