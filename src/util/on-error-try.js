export default function onErrorTry(func, alternate) {
  return async (...args) => {
    try {
      return await func.apply(func, args);
    } catch (e) {
      console.error(e.toString());
      if (e.stack) {
        console.error(e.stack);
      }
    }
    return alternate.apply(alternate, args);
  };
}
