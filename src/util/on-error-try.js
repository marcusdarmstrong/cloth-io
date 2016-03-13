export default function onErrorTry(func, alternate) {
  return async (...args) => {
    try {
      return await func(...args);
    } catch (e) {
      console.error(e);
    }
    return alternate(...args);
  };
}
