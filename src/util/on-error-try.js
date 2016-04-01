export default function onErrorTry(func, alternate) {
  return async () => {
    try {
      return await func.apply(arguments);
    } catch (e) {
      console.error(e.stack);
    }
    return alternate.apply(arguments);
  };
}
