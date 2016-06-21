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
  componentDidMount: function () {

    $(document).keydown(function (e) {
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
      }

      if ([84, 89].includes(e.keyCode)) { // T, Y
        $('#Snare').toggleClass('snare-struck');
        drum = new Snare(ctx);
      }

      if ([85, 73].includes(e.keyCode)) { // U, I
        $('#Hi-Hat').toggleClass('hi-hat-struck');
        drum = new HiHat(ctx);
      }

      if ([71, 72].includes(e.keyCode)) { // G, H
        $('#Hi-Tom').toggleClass('hi-tom-struck');
        drum = new Toms(ctx, "high");
      }

      if ([74, 75].includes(e.keyCode)) { // J, K
        $('#Mid-Tom').toggleClass('mid-tom-struck');
        drum = new Toms(ctx, "mid");
      }

      if ([76, 186].includes(e.keyCode)) { // L, ;
        $('#Low-Tom').toggleClass('low-tom-struck');
        drum = new Toms(ctx, "low");
      }

      if ([79].includes(e.keyCode)) { // O
        $('#Ride-Cymbal').toggleClass('ride-cymbal-struck');
        drum = new RideCymbal(ctx);
      }

      if (e.keyCode === 80) { // P
        $('#Crash-Cymbal').toggleClass('crash-cymbal-struck');
        drum = new CrashCymbal(ctx);
      }
      if (drum) {
        DrumActions.receiveDrum(drum);
        drum.trigger(now);
      }
    });

    $(document).keyup(function (e) {
      if ([66, 78].includes(e.keyCode)) { // B, N
        if (e.keyCode === 66) {
          $('#Left-Bass').toggleClass('bass-left-struck');
        } else if (e.keyCode === 78) {
          $('#Right-Bass').toggleClass('bass-right-struck');
        }
      }

      if ([84, 89].includes(e.keyCode)) { // T, Y
        $('#Snare').toggleClass('snare-struck');
      }

      if ([85, 73].includes(e.keyCode)) { // U, I
        $('#Hi-Hat').toggleClass('hi-hat-struck');
      }

      if ([71, 72].includes(e.keyCode)) { // G, H
        $('#Hi-Tom').toggleClass('hi-tom-struck');
      }

      if ([74, 75].includes(e.keyCode)) { // J, K
        $('#Mid-Tom').toggleClass('mid-tom-struck');
      }

      if ([76, 186].includes(e.keyCode)) { // L, ;
        $('#Low-Tom').toggleClass('low-tom-struck');
      }

      if ([79].includes(e.keyCode)) { // O
        $('#Ride-Cymbal').toggleClass('ride-cymbal-struck');
      }

      if (e.keyCode === 80) { // P
        $('#Crash-Cymbal').toggleClass('crash-cymbal-struck');
      }
    });
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
