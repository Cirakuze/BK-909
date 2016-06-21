var React = require('react');
var $ = require('jquery');

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
    });
  },
  render: function () {
    return (
      <div className="piano-wrapper" id="piano-wrapper">
        PIANO
      </div>
    );
  }
});
