var Store = require('flux/utils').Store;
var VolumeDispatcher = require('../dispatcher/Dispatcher');
var VolumeStore = new Store(VolumeDispatcher);

var _volumes = {
  Organ: "0.1",
  Wood: "0.0",
  Brass: "0.0",
  String: "0.0",

};

VolumeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "UPDATE_VOLUMES":
      updateVolumes(payload.volumes);
      this.__emitChange();
      break;
  }
};

VolumeStore.volumes = function (v) {
  var instruments = [];
  var volumes = [];
  Object.keys(_volumes).forEach(function (i) {
    instruments.push(i);
    volumes.push(_volumes[i]);
  });
  if (v) {
    return volumes;
  } else {
    return [instruments, volumes];
  }
};

function updateVolumes(volumes) {
  Object.keys(_volumes).forEach(function (i, idx) {
    _volumes[i] = volumes[idx];
  });
}

module.exports = VolumeStore;
