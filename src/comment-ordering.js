function sortAndBucket(comments) { // I think O(n log n)
  if (!comments || (comments && comments.length === 0)) {
    return { 0: [] };
  }
  comments.sort((b, a) => a.created - b.created);
  const buckets = {};
  for (let i = 0; i < comments.length; ++i) {
    const comment = comments[i];
    const key = comment.parent_id || 0;
    if (!buckets[key]) {
      buckets[key] = [];
    }
    buckets[key].push(comment);
  }
  return buckets;
}
/*
buckets = {
  0: [list, of, root, children],
  parentid: [list, of, children],
};
*/
function markAndFlatten(buckets, parentId, fork, nestLevel, hidden) { // I think O(n)
  let result = [];
  const bucket = buckets[parentId];
  for (let i = 0; i < bucket.length; ++i) {
    const root = bucket[i];
    const children = buckets[root.id];
    let childNestLevel = nestLevel;
    if (i === bucket.length - 1 && parentId !== 0) {
      childNestLevel--;
    }
    if (fork) {
      root.fork = true;
    }
    root.nestLevel = childNestLevel;
    root.hidden = hidden;
    result.push(root);
    if (children) {
      root.hasReplies = true;
      children[children.length - 1].child = true;
      const descendents = markAndFlatten(
        buckets,
        root.id,
        true,
        childNestLevel + 1,
        root.minimized || root.hidden
      );
      root.descendents = descendents.length;
      result = result.concat(descendents);
    } else {
      root.descendents = 0;
    }
  }
  return result;
}

export default function (rawComments) {
  return markAndFlatten(sortAndBucket(rawComments), 0, false, 0, false);
}
