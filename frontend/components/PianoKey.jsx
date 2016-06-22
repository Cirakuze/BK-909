var React = require('react');
var KeyStore = require('../stores/KeyStore');
var Tones = require('../constants/Tones');
var Note = require('../util/Note');
var NoteToKey = require('../constants/NoteToKey');

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      selected: false
    });
  },
  componentDidMount: function () {
    this.note = new Note(Tones[this.props.noteName]);
    KeyStore.addListener(this.checkForNotes);
  },
  componentWillUnmount: function () {
    KeyStore.removeListener(this.checkForNotes);
  },
  checkForNotes: function () {
    if (KeyStore.allNotes().includes(this.props.noteName)) {
      this.setState({selected: true});
      if (this.props.sustain) {
        this.note.stop();
        setTimeout(this.note.start(), 1000);
      } else {
        this.note.start();
      }
    } else {
      this.setState({selected: false});
      this.note.stop();
    }
  },
  render: function () {
    var keyFlat;
    if (this.props.noteName.includes("b")) {
      keyFlat = true;
    } else {
      keyFlat = false;
    }
    return (
      <div className={ keyFlat ? "key black" : "key white" }
          id={ this.state.selected ? "selected" : ""}>
          <div className={ keyFlat ? "key-name-black" : "key-name-white" }>
            {NoteToKey[this.props.noteName]}
          </div>
      </div>
    );
  }
});
