import React from 'react';
import ReactDOM from 'react-dom';

class ContentEditable extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    if (this.props.html !== ReactDOM.findDOMNode(this).innerHTML) {
      ReactDOM.findDOMNode(this).innerHTML = this.props.html;
    }
  }

  emitChange() {
    const html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
        },
      });
    }
    this.lastHtml = html;
  }

  render() {
    return (
      <div id="contenteditable"
        className="textarea"
        onInput={this.emitChange.bind(this)}
        onBlur={this.emitChange.bind(this)}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.html}}>
      </div>
    );
  }
}

ContentEditable.propTypes = {
  html: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

export default ContentEditable;
