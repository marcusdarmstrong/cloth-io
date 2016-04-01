export default function onError(func, value = null) {
  return async (...args) => {
    try {
      console.error(`In the error a call: ${JSON.stringify(args)}`);
      // eslint-disable-next-line
      console.error(`In the error b call: ${JSON.stringify(arguments)}`);

      return await func.apply(args);
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
