var React = require('react');
var Drumpiece = require('./Drumpiece');
var DrumActions = require('../actions/DrumActions');

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
      ctx: new (window.AudioContext || window.webkitAudioContext)
    });
  },
  componentDidMount: function () {
    DrumActions.receiveDrum(new Bass(this.state.ctx));
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
        <div className="BK-909">
          <a target="_blank" href="https://github.com/Cirakuze/BK-909">BK-909 </a>
        </div>
        <div className="app-title">
          Drums synthesized using WebAudioAPI
        </div>
      </div>
    );
  }
});
