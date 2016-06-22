var React = require('react');
var PianoKey = require('./PianoKey');
var $ = require('jquery');
var KeyAction = require('../actions/KeyActions');
var Mapping = require('../constants/PianoMapping');
var KeyStore = require('../stores/KeyStore');

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

        if ( this.state.sustain &&
          ( e.keyCode !== 32 ) &&
          KeyStore.allNotes().includes( Mapping[e.keyCode] ) ) {
          KeyAction.keyDepressed(Mapping[e.keyCode]);
        }
        KeyAction.keyPressed(Mapping[e.keyCode]);
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
            <PianoKey noteName={"C4"} />
            <PianoKey noteName={"Db4"} />
            <PianoKey noteName={"D4"} />
            <PianoKey noteName={"Eb4"} />
            <PianoKey noteName={"E4"} />
            <PianoKey noteName={"F4"} />
            <PianoKey noteName={"Gb4"} />
            <PianoKey noteName={"G4"} />
            <PianoKey noteName={"Ab4"} />
            <PianoKey noteName={"A4"} />
            <PianoKey noteName={"Bb4"} />
            <PianoKey noteName={"B4"} />
          </div>

          <div className="octave clearfix">
            <PianoKey noteName={"C5"} />
            <PianoKey noteName={"Db5"} />
            <PianoKey noteName={"D5"} />
            <PianoKey noteName={"Eb5"} />
            <PianoKey noteName={"E5"} />
            <PianoKey noteName={"F5"} />
            <PianoKey noteName={"Gb5"} />
            <PianoKey noteName={"G5"} />
            <PianoKey noteName={"Ab5"} />
            <PianoKey noteName={"A5"} />
            <PianoKey noteName={"Bb5"} />
            <PianoKey noteName={"B5"} />
          </div>

          <div className="octave clearfix">
            <PianoKey noteName={"C6"} />
            <PianoKey noteName={"Db6"} />
            <PianoKey noteName={"D6"} />
            <PianoKey noteName={"Eb6"} />
            <PianoKey noteName={"E6"} />
            <PianoKey noteName={"F6"} />
            <PianoKey noteName={"Gb6"} />
            <PianoKey noteName={"G6"} />
          </div>

        </div>
      </div>
    );
  }
});
