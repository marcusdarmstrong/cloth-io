// @flow
import type { Comment } from './entities/comment';

function sortAndBucket(comments) { // I think O(n log n)
  const buckets = {};
  if (!comments || (comments && comments.length === 0)) {
    buckets['0'] = [];
    return buckets;
  }
  comments.sort((b, a) => a.created - b.created);
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
  let result: Comment[] = [];
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
      const descendents = markAndFlatten(
        buckets,
        root.id,
        true,
        childNestLevel + 1,
        root.minimized || root.hidden
      );
      children[children.length - 1].isReply = true;
      children[children.length - 1].fork = false;
      root.descendents = descendents.length;
      result = result.concat(descendents);
    } else {
      root.descendents = 0;
    }
  }
  return result;
}

export default function (rawComments: Comment[]) {
  return markAndFlatten(sortAndBucket(rawComments), 0, false, 0, false);
}
