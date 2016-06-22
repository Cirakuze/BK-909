var React = require('react');
var DrumKeys = require('../constants/DrumKeyConstants');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="drumpiece" id={this.props.drumName}>
        <div
          className="drum-head">
          <div className="drum-name">
            {this.props.drumName}
          </div>
          <div className="drum-key-name">
            {DrumKeys[this.props.drumName]}
          </div>
        </div>
        <div className="drum-body"></div>
        <div className="drum-rim"></div>
        <div className="cymbal-stand"></div>
      </div>
    );
  }
});
