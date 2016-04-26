import React from 'react';
import { validate, TITLE_REX, URL_REX } from '../validator';
import fetch from 'isomorphic-fetch';
import ContentEditable from './content-editable';

export default class ShareForm extends React.Component {
  state = {
    title: '',
    link: '',
    body: '',
    titleError: false,
    titleHelperText: 'The title of your post. 10-35 characters.',
    linkError: false,
    linkHelperText: 'Optional external link to share.',
    submissionError: '',
  };

  handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const failure = !validate(TITLE_REX, newTitle);
    this.setState({ title: newTitle });
    this.setState({ titleError: failure });
    if (failure) {
      if (newTitle.length < 10) {
        this.setState({ titleHelperText: 'Make sure you have at least 10 characters.' });
      } else if (newTitle.length > 35) {
        this.setState({ titleHelperText: 'Keep it under 35 characters.' });
      } else {
        this.setState({ titleHelperText: 'Avoid any weird whitespace.' });
      }
    } else {
      this.setState({ titleHelperText: 'Looks good!' });
    }
  };

  handleLinkChange = (e) => {
    const newLink = e.target.value;
    this.setState({ link: newLink });

    if (newLink !== '') {
      const failure = !validate(URL_REX, newLink);
      this.setState({ linkError: failure });
      if (failure) {
        this.setState({ linkHelperText: 'Double check your link.' });
      } else {
        this.setState({ linkHelperText: 'Looks good!' });
      }
    } else {
      this.setState({ linkError: false, linkHelperText: 'Optional external link to share.' });
    }
  };

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.titleError || this.state.linkError) {
      return;
    }

    fetch('/api/addPost', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        title: this.state.title,
        link: this.state.link,
        body: this.state.body,
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.success && data.post && data.post.urlstring) {
          window.location = `/p/${data.post.urlstring}`;
        } else {
          this.setState({ submissionError: 'Something went wrong.' });
        }
      });
  };

  render() {
    const titleClass = (this.state.titleError) ? ' error' : '';
    const linkClass = (this.state.linkError) ? ' error' : '';
    const submitClass =
          (!this.state.titleError
        && !this.state.linkError
        && this.state.title !== '')
      ? '' : 'disabled';
    const submissionError = (this.state.submissionError === '')
      ? null : (<p className="error">{this.state.submissionError}</p>);

    return (
      <form className="share-form" onSubmit={this.handleSubmit}>
        {submissionError}
        <label htmlFor="title">Post Title:</label>
        <input
          type="text" className={titleClass} autoFocus name="title"
          value={this.state.title} onChange={this.handleTitleChange}
        />
        <div className={`form-helper${titleClass}`}>{this.state.titleHelperText}</div>
        <label htmlFor="link">Link: (Optional)</label>
        <input
          type="url" className={linkClass} name="link"
          value={this.state.link} onChange={this.handleLinkChange}
        />
        <div className={`form-helper${linkClass}`}>{this.state.linkHelperText}</div>
        <label htmlFor="link">Commentary:</label>
        <ContentEditable onChange={this.handleBodyChange} html={this.state.body} />
        <input type="submit" name="submit" className={submitClass} value="Create post" />
      </form>
    );
  }
}
