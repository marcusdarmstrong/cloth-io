import sanitizeHtml from 'sanitize-html';

export default str => {
  let preview = str.substring(0, 140);
  preview = sanitizeHtml(preview);
  return preview;
};
