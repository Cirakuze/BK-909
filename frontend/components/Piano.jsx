var React = require('react');
var PianoKey = require('./PianoKey');
var $ = require('jquery');
var KeyAction = require('../actions/KeyActions');
var Mapping = require('../constants/PianoMapping');

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      piano: false,
      sustain: false
    });
  },
  componentDidMount: function () {
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 39) {
        $('#piano-wrapper').addClass('shown');
        this.setState({piano: !this.state.piano});
      } else if (e.keyCode === 37) {
        $('#piano-wrapper').removeClass('shown');
        this.setState({piano: !this.state.piano});
      }
    }.bind(this));

    $(document).keydown(function(e){
      if (this.state.piano) {
        if (e.keyCode === 32) {
          this.setState({sustain: true});
        }
        
        if (this.state.sustain && (e.keyCode !== 32)) {
          KeyAction.replayNote(Mapping[e.keyCode]);
        } else {
          KeyAction.keyPressed(Mapping[e.keyCode]);
        }
      }
    }.bind(this));

    $(document).keyup(function(e){
      if (this.state.piano) {
        if (e.keyCode === 32) {
          this.setState({sustain: false});
          KeyAction.removeAllNotes();
        }

        if (this.state.sustain === false) {
          KeyAction.keyDepressed(Mapping[e.keyCode]);
        }
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div className="piano-wrapper" id="piano-wrapper">
        <div className="piano clearfix">

          <div className="octave clearfix">
            <PianoKey sustain={this.state.sustain} noteName={"C4"} />
            <PianoKey sustain={this.state.sustain} noteName={"Db4"} />
            <PianoKey sustain={this.state.sustain} noteName={"D4"} />
            <PianoKey sustain={this.state.sustain} noteName={"Eb4"} />
            <PianoKey sustain={this.state.sustain} noteName={"E4"} />
            <PianoKey sustain={this.state.sustain} noteName={"F4"} />
            <PianoKey sustain={this.state.sustain} noteName={"Gb4"} />
            <PianoKey sustain={this.state.sustain} noteName={"G4"} />
            <PianoKey sustain={this.state.sustain} noteName={"Ab4"} />
            <PianoKey sustain={this.state.sustain} noteName={"A4"} />
            <PianoKey sustain={this.state.sustain} noteName={"Bb4"} />
            <PianoKey sustain={this.state.sustain} noteName={"B4"} />
          </div>

          <div className="octave clearfix">
            <PianoKey sustain={this.state.sustain} noteName={"C5"} />
            <PianoKey sustain={this.state.sustain} noteName={"Db5"} />
            <PianoKey sustain={this.state.sustain} noteName={"D5"} />
            <PianoKey sustain={this.state.sustain} noteName={"Eb5"} />
            <PianoKey sustain={this.state.sustain} noteName={"E5"} />
            <PianoKey sustain={this.state.sustain} noteName={"F5"} />
            <PianoKey sustain={this.state.sustain} noteName={"Gb5"} />
            <PianoKey sustain={this.state.sustain} noteName={"G5"} />
            <PianoKey sustain={this.state.sustain} noteName={"Ab5"} />
            <PianoKey sustain={this.state.sustain} noteName={"A5"} />
            <PianoKey sustain={this.state.sustain} noteName={"Bb5"} />
            <PianoKey sustain={this.state.sustain} noteName={"B5"} />
          </div>

          <div className="octave clearfix">
            <PianoKey sustain={this.state.sustain} noteName={"C6"} />
            <PianoKey sustain={this.state.sustain} noteName={"Db6"} />
            <PianoKey sustain={this.state.sustain} noteName={"D6"} />
            <PianoKey sustain={this.state.sustain} noteName={"Eb6"} />
            <PianoKey sustain={this.state.sustain} noteName={"E6"} />
            <PianoKey sustain={this.state.sustain} noteName={"F6"} />
            <PianoKey sustain={this.state.sustain} noteName={"Gb6"} />
            <PianoKey sustain={this.state.sustain} noteName={"G6"} />
          </div>

        </div>
      </div>
    );
  }
});
