// @flow

import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  html?: string,
  onChange?: (event: { target: { value: string } }) => void,
  autoFocus?: boolean,
};

export default class ContentEditable extends React.Component {
  componentDidMount() {
    if (this.props.autoFocus && (typeof window.orientation) === 'undefined') {
      // We use orientation as a proxy for devices with an on-screen keyboard.
      // They don't respond well to auto-focusing, so disabling it for now.
      ReactDOM.findDOMNode(this).focus();
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    if (this.props.html !== ReactDOM.findDOMNode(this).innerHTML) {
      ReactDOM.findDOMNode(this).innerHTML = this.props.html;
    }
  }

  props: Props;
  lastHtml: string;

  emitChange: () => void = () => {
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
      <div
        id="contenteditable"
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
