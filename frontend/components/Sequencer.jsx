var React = require('react');
var DrumStore = require('../stores/DrumStore');
var DrumKeyConstants = require('../constants/DrumKeyConstants');
var SequencerConstants = require('../constants/SequencerConstants');
var SequencerActions = require('../actions/SequencerActions');
var SequencerStore = require('../stores/SequencerStore');
var $ = require('jquery');
var Drums = require('../constants/Drums');
var ctx = new (window.AudioContext || window.webkitAudioContext);

var stepKeys = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: "Q",
  5: "W",
  6: "E",
  7: "R",
  8: "A",
  9: "S",
  10: "D",
  11: "F",
  12: "Z",
  13: "X",
  14: "C",
  15: "V"
};

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      leds: [false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false],
      currentStep: 1,
      switching: false,
      drum: "",
      tempo: 120,
      playing: false,
      error: "",
      piano: false
    });
  },
  componentDidMount: function () {
    this.setState({drum: DrumStore.drum().name});
    this.dListener = DrumStore.addListener(this.setDrum);
    this.sListener = SequencerStore.addListener(this.manageLEDs);

    document.addEventListener('keydown', function (e) {
      if (e.keycode === 39) {
        this.setState({piano: true});
      } else if (e.keyCode === 37) {
        this.setState({piano: false});
      }
      
      if (this.state.piano === false) {
        if (e.keyCode === 32) {
          // spacebar
          this.togglePlayBack();
        } else if (e.keyCode === 13) {
          // enter
          this.resetSequence();
        } else if (e.keyCode === 38) {
          this.tempoUp();
        } else if (e.keyCode == 40) {
          this.tempoDown();
        }

        this.setState({error:""});
        if (this.state.switching) {
          var newBank = SequencerConstants.codeToBeat[e.keyCode];
          if (!newBank) {
            // this.setState({error:"That bank does not exist!"});
          } else {
            SequencerActions.switchBank(newBank);
            this.manageLEDs();
            this.setState({switching:false});
          }
        } else {
          if (e.keyCode === 192) {
            this.setState({switching:true});
          } else {
            if ( (!DrumStore.empty()) &&
              SequencerConstants.codeToName.hasOwnProperty(e.keyCode) ) {
              SequencerActions.updateBank(
                SequencerConstants.codeToBeat[e.keyCode]
              );
            } else if (DrumKeyConstants.codes.includes(e.keyCode)) {
              // console.log(e.keyCode);
            }
          }
        }
      }
    }.bind(this));
  },
  componentWillUnmount: function () {
    this.dListener.remove();
    this.sListener.remove();
  },
  setDrum: function () {
    this.setState({drum:DrumStore.drum().name});
    this.manageLEDs();
  },
  manageLEDs: function () {
    var bank = SequencerStore.bank(SequencerStore.currentBank());
    var drum = [DrumStore.drum().name];
    this.setState({leds:bank[drum]});
  },
  updateTempo: function (e) {
    this.setState({tempo:e.currentTarget.value});
  },
  togglePlayBack: function () {
    if (!this.state.playing) {
      this.intervalID = setInterval(function () {
        this.stepTheSequence();
      }.bind(this), 15000 / this.state.tempo);
    } else {
      clearInterval(this.intervalID);
    }
    this.setState({playing: !this.state.playing});
  },
  stepTheSequence: function () {
    this.resetKlass();

    this.bank = SequencerStore.bank(SequencerStore.currentBank());
    Object.keys(this.bank).forEach(function (drum) {

      if (this.bank[drum][this.state.currentStep - 1]) {
        Drums[drum](ctx).trigger(ctx.currentTime);
        $(Drums.select[drum]).addClass(Drums.toggle[drum]);
      }
    }.bind(this));

    if (this.state.currentStep  < 16) {
      this.setState({currentStep: this.state.currentStep += 1});
    } else {
      this.setState({currentStep: 1});
    }
  },
  resetKlass: function () {
    Object.keys(Drums.select).forEach(function (drum) {
      $(Drums.select[drum]).removeClass(Drums.toggle[drum]);
    });
  },
  resetSequence: function () {
    this.setState({currentStep:1});
  },
  tempoUp: function () {
    this.setState({tempo: this.state.tempo + 4});
    clearInterval(this.intervalID);
    if (this.state.playing) {
      this.intervalID = setInterval(function () {
        this.stepTheSequence();
      }.bind(this), 15000 / this.state.tempo);
    }
  },
  tempoDown: function () {
    this.setState({tempo: this.state.tempo - 4});
    clearInterval(this.intervalID);
    if (this.state.playing) {
      this.intervalID = setInterval(function () {
        this.stepTheSequence();
      }.bind(this), 15000 / this.state.tempo);
    }
  },
  render: function () {
    var buttons = this.state.leds.map(function (button, key) {
      var klass = this.state.leds[key] ? "button-led LED-ON" : "button-led";
      var klass2 = (this.state.currentStep === key + 1) ? "step-led LED-ON" : "step-led";
      return <div className="button" key={key}>
              <div className={klass}>
                <p>{stepKeys[key]}</p>
              </div>
              <div className={klass2} key={key}></div>
            </div>;
    }.bind(this));
    return (
      <div className="sequencer-wrapper">
        <div className="sequencer-controlls-wrapper">
          <div className="sequencer-controlls clearfix">
            <div className="start-sequence" onClick={this.togglePlayBack}>
              {this.state.playing ?
                <i className="fa fa-pause-circle" aria-hidden="true"></i> :
                  <i className="fa fa-play-circle" aria-hidden="true"></i>}
            </div>
            <div className="reset-sequence" onClick={this.resetSequence}>
              <i className="fa fa-stop-circle" aria-hidden="true"></i>
            </div>
            <p>Tempo</p>
            <input
              type="text"
              disabled="disabled"
              value={this.state.tempo}
              onChange={this.updateTempo}/>
            <div className="tempo-controlls">
              <i className="fa fa-angle-up"
                id="vol-up"
                aria-hidden="true"
                onClick={this.tempoUp}></i>
              <i className="fa fa-angle-down"
                id="vol-down"
                aria-hidden="true"
                onClick={this.tempoDown}></i>
            </div>
            <div>{this.state.error}</div>
            <div className="sequencer-display clearfix">
              <div>Current Bank {SequencerStore.currentBank()}/16</div>
              <div>Current Drum {this.state.drum}</div>
            </div>
          </div>
        </div>
        <div className="sequencer clearfix">
          {buttons}
        </div>
        <div className="instructions-wrapper">
          <div className="instructions">
            <h1>Instructions:</h1>
            <h3>Short version:</h3>
            <p>1) Press ~ (the key above the tab key)</p>
            <p>2) Press z, x, c, or v</p>
            <p>3) Press space bar</p>
            <br />
            <h3>Long version:</h3>
            <p>-Select a drum by pressing the key on the drum</p>
            <p>-Toggle a step by pressing the key on the step</p>
            <p>&nbsp;(red dot is on / brown dot is off)</p>
            <p>-Space bar starts/stops the sequence</p>
            <p>-Enter resets the sequence</p>
            <p>-Up/Down arrow keys speed up/slow down tempo</p>
            <p>-Switch banks by pressing tilde then a step key</p>
            <p>-Banks 13 (z), 14 (x), 15 (c), and 16 (v) have preset rhythms</p>
          </div>
        </div>
      </div>
    );
  }
});
