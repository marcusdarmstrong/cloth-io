import React from 'react';

class ContentEditable extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.getDOMNode().innerHTML;
  }

  componentDidUpdate() {
    if (this.props.html !== this.getDOMNode().innerHTML) {
      this.getDOMNode().innerHTML = this.props.html;
    }
  }

  emitChange() {
    const html = this.getDOMNode().innerHTML;
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
        onInput={this.emitChange}
        onBlur={this.emitChange}
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
