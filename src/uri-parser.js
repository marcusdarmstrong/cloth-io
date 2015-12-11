const parser = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;

export default (uri) => {
  const match = parser.exec(uri);
  return {
    protocol: match[2],
    host: match[3],
    path: match[4],
    file: match[6],
    query: match[7],
    hash: match[8],
  };
};
