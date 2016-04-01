export default function onError(func, value = null) {
  return async () => {
    try {
      return await func.apply(arguments);
    } catch (e) {
      console.error(e.toString());
      if (e.stack) {
        console.error(e.stack);
      }
      if (e.query) {
        console.error(e.query);
      }
      if (e.params) {
        console.error(JSON.stringify(e.params));
      }
    }
    return value;
  };
}
