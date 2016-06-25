var Store = require('flux/utils').Store;
var VolumeDispatcher = require('../dispatcher/Dispatcher');
var VolumeStore = new Store(VolumeDispatcher);

var _volumes = {
  Organ: "0.1",
  Wood: "0.05",
  Brass: "0.0375",
  String: "0.0250",
};

VolumeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "UPDATE_VOLUMES":
      updateVolumes(payload.volumes);
      this.__emitChange();
      break;
  }
};

VolumeStore.volumes = function (category) {
  var instruments = [];
  var volumes = [];
  Object.keys(_volumes).forEach(function (i) {
    instruments.push(i);
    volumes.push(_volumes[i]);
  });
  if (category === "v") {
    return volumes;
  } else if (category === "i") {
    return instruments;
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
