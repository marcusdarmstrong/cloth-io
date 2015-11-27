function sortAndBucket(comments) { // I think O(n log n)
  comments.sort((a, b) => a.created - b.created);
  const buckets = {};
  for (let i = 0; i < comments.length; ++i) {
    const comment = comments[i];
    const key = comment.parent_id || 0;
    if (!buckets[key]) {
      buckets[key] = [];
    }
    buckets[key].push(comment);
  }
  console.log(JSON.stringify(buckets));
  return buckets;
}

function markAndFlatten(buckets, parentId, fork) { // I think O(n)
  const result = [];
  const bucket = buckets[parentId];
  for (let i = 0; i < bucket.length; ++i) {
    const root = bucket[i];
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
  }
  return result;
}

export default function(rawComments) {
  return markAndFlatten(sortAndBucket(rawComments), 0, false);
}
