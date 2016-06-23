var React = require('react');
var $ = require('jquery');
var VolumeActions = require('../actions/VolumeActions');
var VolumeStore = require('../stores/VolumeStore');

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      instruments: [],
      volume: [],
      currentBar: 1
    });
  },
  componentDidMount: function () {
    this.listener = VolumeStore.addListener(this.receiveVolumes);
    this.receiveVolumes();

    $(document).keydown(function (e) {
      if (e.keyCode === 13 || e.keyCode === 9) {
        // Enter key or Tab key
        e.preventDefault();
        if (this.state.currentBar < this.state.instruments.length) {
          this.setState({currentBar: this.state.currentBar + 1});
        } else {
          this.setState({currentBar: 1});
        }
      } else if ([38, 40].includes(e.keyCode)) {
        if (e.keyCode === 40) {
          this.downVolume();
        } else if (e.keyCode === 38) {
          this.upVolume();
        }
      }
      this.displayCurrentBar();
    }.bind(this));
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  receiveVolumes: function () {
    var iv = VolumeStore.volumes();
    // iv is an array of two subarrays, instruments, and volumes.
    this.setState({
      instruments: iv[0],
      volume: iv[1]
    });
  },
  displayCurrentBar: function () {
    var ids = this.state.instruments.map(function (i) {
      return "#drawbar-" + i;
    });
    ids.forEach(function (id) {
      $(id).removeClass('drawbar-selected');
    });
    var currId = "#drawbar-" + this.state.instruments[this.state.currentBar - 1];
    $(currId).addClass('drawbar-selected');
  },
  upVolume: function () {
    if (this.state.volume[this.state.currentBar - 1] < 0.1) {
      var volumes = this.state.volume;
      volumes[this.state.currentBar - 1] =
        parseFloat(volumes[this.state.currentBar - 1]) + 0.0125;
      VolumeActions.updateVolumes(volumes);
    }
  },
  downVolume: function () {
    if (this.state.volume[this.state.currentBar - 1] > 0.001) {
      var volumes = this.state.volume;
      volumes[this.state.currentBar - 1] =
        parseFloat(volumes[this.state.currentBar - 1]) - 0.0125;
      VolumeActions.updateVolumes(volumes);
    }
  },
  updateVolume: function (e) {
    var volumes = this.state.volume;
    volumes[this.state.currentBar - 1] = e.currentTarget.value;
    VolumeActions.updateVolumes(volumes);
  },
  render: function () {
    var drawbars = this.state.instruments.map(function (i, key) {
      var idx = this.state.instruments.indexOf(i);
      return (
        <div id={"drawbar-" + i}
          className="drawbar"
          key={key}>
          <div id={"drawbar-label-" + i}
            className="drawbar-label">
            {i}
          </div>
          <input
            disabled={(this.state.currentBar == idx + 1) ? "" : "disabled"}
            id={"drawbar-slider-" + i}
            className="drawbar-slider"
            type="range" name="volume"
            min="0" max="0.1" step="0.0125"
            value={this.state.volume[key]}
            onChange={this.updateVolume} />
        </div>
      );
    }.bind(this));
    return (
      <div id="drawbars-wrapper">
        <div id="drawbars-label">DRAWBARS</div>
        <div id="drawbars-container" className="clearfix">
          {drawbars}
        </div>
        <div id="drawbars-instructions">
          <h1>Instructions</h1>
          <p>Press space bar to sustain notes</p>
          <p>Press enter/tab to cycle through instruments</p>
          <p>Use up/down arrow keys to change volume</p>
        </div>
      </div>
    );
  }
});
