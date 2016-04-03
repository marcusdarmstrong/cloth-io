import React from 'react';
import ReactDOM from 'react-dom';

export default class ContentEditable extends React.Component {
  static propTypes = {
    html: React.PropTypes.string,
    onChange: React.PropTypes.func,
    autoFocus: React.PropTypes.bool,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      ReactDOM.findDOMNode(this).click();
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    if (this.props.html !== ReactDOM.findDOMNode(this).innerHTML) {
      ReactDOM.findDOMNode(this).innerHTML = this.props.html;
    }
  }

  emitChange = () => {
    const html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
        },
      });
    }
    this.lastHtml = html;
  };

  render() {
    return (
      <div id="contenteditable"
        className="textarea"
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      >
      </div>
    );
  }
}
