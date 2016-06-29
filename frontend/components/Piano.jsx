var React = require('react');
var PianoKey = require('./PianoKey');
var $ = require('jquery');
var KeyAction = require('../actions/KeyActions');
var Mapping = require('../constants/PianoMapping');
var KeyStore = require('../stores/KeyStore');
var Drawbars = require('./Drawbars');

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      piano: false,
      sustain: false,
    });
  },
  componentDidMount: function () {
    $(document).keydown(function(e){
      if (e.keyCode === 39) {
        this.setState({piano: true});
        $('#piano-wrapper').addClass('shown');
      } else if (e.keyCode === 37) {
        this.setState({piano: false});
        $('#piano-wrapper').removeClass('shown');
      }

      if (e.keyCode === 8) {
        e.preventDefault();
      }
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
    var pianoKeys = [
      ["F3","Gb3","G3","Ab3","A3","Bb3","B3"],
      ["C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4"],
      ["C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5"],
      ["C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6","A6"]
    ].map(function (octave, octaveIndex) {
      var notes = octave.map(function (noteName, noteIndex) {
        return <PianoKey
          noteName={noteName}
          key={noteIndex}
          aCtx={this.props.aCtx}
          analyser={this.props.analyser} />;
      }.bind(this));
      return <div className="octave clearfix" key={octaveIndex}>
        {notes}
      </div>;
    }.bind(this));
    return (
      <div className="piano-wrapper" id="piano-wrapper">
        <div className="piano-label">ORGAN</div>
        <div className="piano clearfix">
          {pianoKeys}
        </div>
        <Drawbars />
      </div>
    );
  }
});
