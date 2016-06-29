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
      piano: false
    });
  },
  componentDidMount: function () {
    this.ctx = this.props.aCtx;
    this.analyser = this.props.analyser;
    DrumActions.receiveDrum(new Bass(this.ctx, this.analyser));

    $(document).keydown(function (e) {
      if (e.keyCode === 39) {
        // RIGHT ARROW
        this.setState({piano: true});
        $('.drumset').addClass('hidden');
      } else if (e.keyCode === 37) {
        // LEFT ARROW
        this.setState({piano: false});
        $('.drumset').removeClass('hidden');
      } else {
        if (this.state.piano === false) {
          var now = this.ctx.currentTime;
          var drum;

          if ([66, 78].includes(e.keyCode)) { // B, N
            if (e.keyCode === 66) {
              $('#Left-Bass').toggleClass('bfass-left-struck');
              drum = new Bass(this.ctx, this.analyser);
            } else if (e.keyCode === 78) {
              $('#Right-Bass').toggleClass('bass-right-struck');
              drum = new Bass(this.ctx, this.analyser);
            }
          } else if ([84, 89].includes(e.keyCode)) { // T, Y
            $('#Snare').toggleClass('snare-struck');
            drum = new Snare(this.ctx, this.analyser);
          } else if ([85, 73].includes(e.keyCode)) { // U, I
            $('#Hi-Hat').toggleClass('hi-hat-struck');
            drum = new HiHat(this.ctx, this.analyser);
          } else if ([71, 72].includes(e.keyCode)) { // G, H
            $('#Hi-Tom').toggleClass('hi-tom-struck');
            drum = new Toms(this.ctx, this.analyser, "high");
          } else if ([74, 75].includes(e.keyCode)) { // J, K
            $('#Mid-Tom').toggleClass('mid-tom-struck');
            drum = new Toms(this.ctx, this.analyser, "mid");
          } else if ([76, 186].includes(e.keyCode)) { // L, ;
            $('#Low-Tom').toggleClass('low-tom-struck');
            drum = new Toms(this.ctx, this.analyser, "low");
          } else if ([79].includes(e.keyCode)) { // O
            $('#Ride-Cymbal').toggleClass('ride-cymbal-struck');
            drum = new RideCymbal(this.ctx, this.analyser);
          } else if (e.keyCode === 80) { // P
            $('#Crash-Cymbal').toggleClass('crash-cymbal-struck');
            drum = new CrashCymbal(this.ctx, this.analyser);
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
    var drumPieces = Object.keys(DrumConstants).map(function (drum, key) {
      return <Drumpiece drumName={DrumConstants[drum]} key={key} />;
    }.bind(this));

    return (
      <div className="drumset">
        {drumPieces}

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
