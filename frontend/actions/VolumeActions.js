var DrumDispatcher = require('../dispatcher/Dispatcher');

module.exports = {
  updateVolumes: function (newVolumes) {
    DrumDispatcher.dispatch({
      actionType: "UPDATE_VOLUMES",
      volumes: newVolumes
    });
  }
};
