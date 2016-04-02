export default function onError(func, value = null) {
  return async (...args) => {
    try {
      return await func.apply(func, args);
    } catch (e) {
      if (e.stack) {
        console.error(e.stack);
      } else {
        console.error(e.toString());
      }
    }
    if ((typeof value) === 'function') {
      return value.apply(value, args);
    }
    return value;
  };
}
