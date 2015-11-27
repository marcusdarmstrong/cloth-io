function sortAndBucket(comments) { // I think O(n log n)
  comments.sort((a, b) => a.created - b.created);
  const buckets = {};
  comments.map((comment) => { // O(n)
    const key = comment.parent_id || 0;
    if (!buckets[key]) {
      buckets[key] = [];
    }
    buckets[key].push(comment);
  });
  return buckets;
}

function markAndFlatten(buckets, parentId, fork) { // I think O(n)
  const result = [];
  buckets[parentId].map((root) => {
    const children = buckets[root.id];
    if (fork) {
      root.fork = true;
    }
    result.push(root);
    if (children) {
      root.hasReplies = true;
      children[children.length - 1].child = true;
      result.concat(markAndFlatten(buckets, root.id, true));
    }
  });
  return result;
}

export default function(rawComments) {
  return markAndFlatten(sortAndBucket(rawComments), 0, false);
}
