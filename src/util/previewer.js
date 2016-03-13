import sanitizeHtml from 'sanitize-html';

export default str => {
  const preview = sanitizeHtml(str, { allowedTags: [] });
  return preview.substring(0, 140);
};