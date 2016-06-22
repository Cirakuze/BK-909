var React = require('react');
var PianoKey = require('./PianoKey');
var $ = require('jquery');
var KeyAction = require('../actions/KeyActions');
var Mapping = require('../constants/PianoMapping');

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      piano: false
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
        console.log("piano key down");
        KeyAction.keyPressed(Mapping[e.keyCode]);
      }
    }.bind(this));

    $(document).keyup(function(e){
      if (this.state.piano) {
        console.log("piano key up");
        KeyAction.keyDepressed(Mapping[e.keyCode]);
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div className="piano-wrapper" id="piano-wrapper">
        <div id="octave">
          <PianoKey noteName={"C5"}/>
          <PianoKey noteName={"Db5"}/>
          <PianoKey noteName={"D5"}/>
          <PianoKey noteName={"Eb5"}/>
          <PianoKey noteName={"E5"}/>
          <PianoKey noteName={"F5"}/>
          <PianoKey noteName={"Gb5"}/>
          <PianoKey noteName={"G5"}/>
          <PianoKey noteName={"Ab5"}/>
          <PianoKey noteName={"A5"}/>
          <PianoKey noteName={"Bb5"}/>
          <PianoKey noteName={"B5"}/>
        </div>

        <div id="octave">
          <PianoKey noteName={"C6"}/>
          <PianoKey noteName={"Db6"}/>
          <PianoKey noteName={"D6"}/>
          <PianoKey noteName={"Eb6"}/>
          <PianoKey noteName={"E6"}/>
          <PianoKey noteName={"F6"}/>
          <PianoKey noteName={"Gb6"}/>
          <PianoKey noteName={"G6"}/>
          <PianoKey noteName={"Ab6"}/>
          <PianoKey noteName={"A6"}/>
          <PianoKey noteName={"Bb6"}/>
          <PianoKey noteName={"B6"}/>
        </div>

        <div id="octave">
          <PianoKey noteName={"C7"}/>
          <PianoKey noteName={"Db7"}/>
          <PianoKey noteName={"D7"}/>
          <PianoKey noteName={"Eb7"}/>
          <PianoKey noteName={"E7"}/>
          <PianoKey noteName={"F7"}/>
          <PianoKey noteName={"Gb7"}/>
          <PianoKey noteName={"G7"}/>
        </div>
      </div>
    );
  }
});
