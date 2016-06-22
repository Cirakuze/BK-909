var React = require('react');
var DrumStore = require('../stores/DrumStore');
var DrumKeyConstants = require('../constants/DrumKeyConstants');
var SequencerConstants = require('../constants/SequencerConstants');
var SequencerActions = require('../actions/SequencerActions');
var SequencerStore = require('../stores/SequencerStore');
var $ = require('jquery');
var Drums = require('../constants/Drums');
var ctx = new (window.AudioContext || window.webkitAudioContext);

var steps = { 0: 1, 1: 2, 2: 3, 3: 4, 4: "Q", 5: "W", 6: "E", 7: "R", 8: "A", 9: "S", 10: "D", 11: "F", 12: "Z", 13: "X", 14: "C", 15: "V" };

function stepKeys(key) {
  // This wraps the key numbers so that the same letters can be used on all rows
  if (key > 47) {
    key -= 48;
  } else if (key > 31) {
    key -= 32;
  } else if (key > 15) {
    key -= 16;
  }
  return steps[key];
}

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      leds: [false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false],
      rows: 1,
      currentRow: 1,
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
    $('#step0').addClass('row-selected');
    this.setState({drum: DrumStore.drum().name});
    this.dListener = DrumStore.addListener(this.setDrum);
    this.sListener = SequencerStore.addListener(this.manageLEDs);

    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 39) {
        this.setState({piano: true});
        $('.sequencer-wrapper').addClass('hidden');
        $('.drumset').addClass('hidden');
      } else if (e.keyCode === 37) {
        this.setState({piano: false});
        $('.sequencer-wrapper').removeClass('hidden');
        $('.drumset').removeClass('hidden');
      } else {
        if (this.state.piano === false) {
          if (e.keyCode === 9) {
            e.preventDefault();
            // prevent tab from actually tabbing
            if (this.state.currentRow < this.state.rows) {
              // wrap row number
              this.setState({currentRow: this.state.currentRow + 1});
            } else {
              this.setState({currentRow: 1});
            }

            this.displayCurrentRow();
          }
          if (e.keyCode === 187) {
            // 187 +
            if (this.state.rows < 4) {
              this.setState({rows: this.state.rows + 1});
              SequencerActions.updateLength(this.state.rows);
            }
          } else if (e.keyCode === 189) {
            // 189 -
            if (this.state.rows > 1) {
              this.setState({rows: this.state.rows - 1});
              SequencerActions.updateLength(this.state.rows);
              if (this.state.currentRow > 1) {
                this.setState({currentRow: this.state.currentRow - 1});
                this.displayCurrentRow();
              }
            }
          }

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

                var beat;
                if (this.state.currentRow == 4) {
                  beat = SequencerConstants.codeToBeat[e.keyCode] + 48;
                } else if (this.state.currentRow == 3) {
                  beat = SequencerConstants.codeToBeat[e.keyCode] + 32;
                } else if (this.state.currentRow == 2) {
                  beat = SequencerConstants.codeToBeat[e.keyCode] + 16;
                } else if (this.state.currentRow == 1) {
                  beat = SequencerConstants.codeToBeat[e.keyCode];
                }

                SequencerActions.updateBank(beat);
              } else if (DrumKeyConstants.codes.includes(e.keyCode)) {
                // console.log(e.keyCode);
              }
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
  displayCurrentRow: function () {
    $('#step0').removeClass('row-selected');
    $('#step16').removeClass('row-selected');
    $('#step32').removeClass('row-selected');
    $('#step48').removeClass('row-selected');

    if (this.state.currentRow == 1) {
      $('#step0').addClass('row-selected');
    } else if (this.state.currentRow == 2) {
      $('#step16').addClass('row-selected');
    } else if (this.state.currentRow == 3) {
      $('#step32').addClass('row-selected');
    } else if (this.state.currentRow == 4) {
      $('#step48').addClass('row-selected');
    }
  },
  setDrum: function () {
    this.setState({drum:DrumStore.drum().name});
    this.manageLEDs();
  },
  manageLEDs: function () {
    var bank = SequencerStore.bank(SequencerStore.currentBank());
    var drum = [DrumStore.drum().name];
    var newTempo = SequencerStore.currentTempo();
    this.setState({
      leds:bank[drum],
      tempo: newTempo
    });
  },
  updateTempo: function (e) {
    SequencerActions.updateTempo(e.currentTarget.value);
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

    if (this.state.currentStep  < this.state.leds.length) {
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
    if (this.state.tempo < 240) {
      $('#tempo').removeClass('tempo-limit');
      this.setState({tempo: this.state.tempo + 4});
      clearInterval(this.intervalID);
      if (this.state.playing) {
        this.intervalID = setInterval(function () {
          this.stepTheSequence();
        }.bind(this), 15000 / this.state.tempo);
      }
    } else if (this.state.tempo === 240) {
      $('#tempo').addClass('tempo-limit');
    }
  },
  tempoDown: function () {
    if (this.state.tempo > 40) {
      $('#tempo').removeClass('tempo-limit');
      this.setState({tempo: this.state.tempo - 4});
      clearInterval(this.intervalID);
      if (this.state.playing) {
        this.intervalID = setInterval(function () {
          this.stepTheSequence();
        }.bind(this), 15000 / this.state.tempo);
      }
    } else if (this.state.tempo === 40) {
      $('#tempo').addClass('tempo-limit');
    }
  },
  render: function () {
    var buttons = this.state.leds.map(function (button, key) {
      var klass = this.state.leds[key] ? "button-led LED-ON" : "button-led";
      var klass2 = (this.state.currentStep === key + 1) ? "step-led LED-ON" : "step-led";
      var stepLabel = stepKeys(key);
      return <div className="button" key={key}>
              <div className={klass}>
                <p id={"step" + key}>{stepLabel}</p>
              </div>
              <div className={klass2} key={key}></div>
            </div>;
    }.bind(this));
    return (
      <div className="sequencer-wrapper">
        <div className="instructions-wrapper">
          <div className="instructions">
            <h1>Instructions:</h1>
            <h3>Short version:</h3>
            <p>1) Press ~ (the key above the tab key)</p>
            <p>2) Press v</p>
            <p>3) Press space bar</p>
            <h3>Long version:</h3>
            <p>-Select a drum by pressing the key on the drum</p>
            <p>-Toggle a step by pressing the key on the step</p>
            <p>&nbsp;(red dot is on / brown dot is off)</p>
            <p>-Space bar starts/stops the sequence</p>
            <p>-Enter resets the sequence</p>
            <p>-Up/Down arrow keys speed up/slow down tempo</p>
            <p>-Switch banks by pressing tilde then a step key</p>
            <p>-Press +/- to lengthen/shorten pattern</p>
            <p>-Press tab to cycle through rows of pattern</p>
            <p>-Banks 13 (z), 14 (x), 15 (c), and 16 (v) are presets</p>
            <p>-Press the right arrow key to access piano (left to come back)</p>
          </div>
        </div>
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
              id="tempo"
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
      </div>
    );
  }
});
