export default function onError(func, value = null) {
  return async (...args) => {
    try {
      return await func(...args);
    } catch (e) {
      console.error(e.stack);
    }
    return value;
  };
}
