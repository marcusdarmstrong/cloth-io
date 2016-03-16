export default function onError(func, value = null) {
  return async (...args) => {
    try {
      return await func.apply(args);
    } catch (e) {
      console.error(e.stack);
    }
    return value;
  };
}
