var React = require('react');
var DrumKeys = require('../constants/DrumKeyConstants');
var DrumActions = require('../actions/DrumActions');
var $ = require("jquery");
var Bass = require('../util/Bass.js');
var Snare = require('../util/Snare.js');
var Toms = require('../util/Toms.js');
var HiHat = require('../util/HiHat.js');
var RideCymbal = require('../util/RideCymbal.js');
var CrashCymbal = require('../util/CrashCymbal.js');
var DrumActions = require('../actions/DrumActions');
var ctx = new (window.AudioContext || window.webkitAudioContext);

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      piano: false
    });
  },
  componentDidMount: function () {
    $(document).keydown(function (e) {
      if (e.keyCode === 39) {
        this.setState({piano: true});
      } else if (e.keyCode === 37) {
        this.setState({piano: false});
      } else {
        if (this.state.piano === false) {
          var now = ctx.currentTime;
          var drum;

          if ([66, 78].includes(e.keyCode)) { // B, N
            if (e.keyCode === 66) {
              $('#Left-Bass').toggleClass('bfass-left-struck');
              drum = new Bass(ctx);
            } else if (e.keyCode === 78) {
              $('#Right-Bass').toggleClass('bass-right-struck');
              drum = new Bass(ctx);
            }
          } else if ([84, 89].includes(e.keyCode)) { // T, Y
            $('#Snare').toggleClass('snare-struck');
            drum = new Snare(ctx);
          } else if ([85, 73].includes(e.keyCode)) { // U, I
            $('#Hi-Hat').toggleClass('hi-hat-struck');
            drum = new HiHat(ctx);
          } else if ([71, 72].includes(e.keyCode)) { // G, H
            $('#Hi-Tom').toggleClass('hi-tom-struck');
            drum = new Toms(ctx, "high");
          } else if ([74, 75].includes(e.keyCode)) { // J, K
            $('#Mid-Tom').toggleClass('mid-tom-struck');
            drum = new Toms(ctx, "mid");
          } else if ([76, 186].includes(e.keyCode)) { // L, ;
            $('#Low-Tom').toggleClass('low-tom-struck');
            drum = new Toms(ctx, "low");
          } else if ([79].includes(e.keyCode)) { // O
            $('#Ride-Cymbal').toggleClass('ride-cymbal-struck');
            drum = new RideCymbal(ctx);
          } else if (e.keyCode === 80) { // P
            $('#Crash-Cymbal').toggleClass('crash-cymbal-struck');
            drum = new CrashCymbal(ctx);
          }

          if (drum) {
            DrumActions.receiveDrum(drum);
            drum.trigger(now);
          }
        }
      }
    }.bind(this));

    $(document).keyup(function (e) {
      if (this.state.piano === false) {
        if ([66, 78].includes(e.keyCode)) { // B, N
          if (e.keyCode === 66) {
            $('#Left-Bass').toggleClass('bass-left-struck');
          } else if (e.keyCode === 78) {
            $('#Right-Bass').toggleClass('bass-right-struck');
          }
        } else if ([84, 89].includes(e.keyCode)) { // T, Y
          $('#Snare').toggleClass('snare-struck');
        } else if ([85, 73].includes(e.keyCode)) { // U, I
          $('#Hi-Hat').toggleClass('hi-hat-struck');
        } else if ([71, 72].includes(e.keyCode)) { // G, H
          $('#Hi-Tom').toggleClass('hi-tom-struck');
        } else if ([74, 75].includes(e.keyCode)) { // J, K
          $('#Mid-Tom').toggleClass('mid-tom-struck');
        } else if ([76, 186].includes(e.keyCode)) { // L, ;
          $('#Low-Tom').toggleClass('low-tom-struck');
        } else if ([79].includes(e.keyCode)) { // O
          $('#Ride-Cymbal').toggleClass('ride-cymbal-struck');
        } else if (e.keyCode === 80) { // P
          $('#Crash-Cymbal').toggleClass('crash-cymbal-struck');
        }
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div className="drumpiece" id={this.props.drumName}>
        <div
          className="drum-head">
          <div className="drum-name">
            {
              this.props.drumName
            }
          </div>
          <div className="drum-key-name">
            {
              DrumKeys[this.props.drumName]
            }
          </div>
        </div>
        <div className="drum-body"></div>
        <div className="drum-rim"></div>
        <div className="cymbal-stand"></div>
      </div>
    );
  }
});
