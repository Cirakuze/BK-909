var React = require('react');
var Drumpiece = require('./Drumpiece');
var DrumActions = require('../actions/DrumActions');
var $ = require("jquery");
var Bass = require('../util/Bass.js');
var Snare = require('../util/Snare.js');
var Toms = require('../util/Toms.js');
var HiHat = require('../util/HiHat.js');
var RideCymbal = require('../util/RideCymbal.js');
var CrashCymbal = require('../util/CrashCymbal.js');
var DrumConstants = require('../constants/DrumConstants');

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      ctx: new (window.AudioContext || window.webkitAudioContext),
      piano: false
    });
  },
  componentDidMount: function () {
    var ctx = this.state.ctx;
    DrumActions.receiveDrum(new Bass(ctx));

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
    var now = this.state.ctx.currentTime;

    var BassedLeft = new Bass(this.state.ctx);
    var BassedRight = new Bass(this.state.ctx);
    var Snared = new Snare(this.state.ctx);
    var HiHatted = new HiHat(this.state.ctx);
    var TommedHi = new Toms(this.state.ctx, "high");
    var TommedMid = new Toms(this.state.ctx, "mid");
    var TommedLow = new Toms(this.state.ctx, "low");
    var RideCymballed = new RideCymbal(this.state.ctx);
    var CrashCymballed = new CrashCymbal(this.state.ctx);

    return (
      <div className="drumset">
        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.cymbalride}
          drumType={RideCymballed} />
        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.cymbalcrash}
          drumType={CrashCymballed} />

        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.tomhigh}
          drumType={TommedHi} />
        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.tommid}
          drumType={TommedMid} />
        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.tomlow}
          drumType={TommedLow} />

        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.hihat}
          drumType={HiHatted} />

        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.snare}
          drumType={Snared} />

        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.bassleft}
          drumType={BassedLeft} />
        <Drumpiece
          ctx={this.state.ctx}
          drumName={DrumConstants.bassright}
          drumType={BassedRight} />

        <div className="cymbal-stand-legs">
          <div className="cymbal-stand-legs-1"></div>
          <div className="cymbal-stand-legs-2"></div>
          <div className="cymbal-stand-legs-3"></div>
        </div>

        <div className="snare-stand-legs">
          <div className="snare-stand"></div>
          <div className="snare-stand-legs-1"></div>
          <div className="snare-stand-legs-2"></div>
          <div className="snare-stand-legs-3"></div>
        </div>

        <div className="rug"></div>
        <div className="app-title">
          Drums synthesized using WebAudioAPI
        </div>
      </div>
    );
  }
});
