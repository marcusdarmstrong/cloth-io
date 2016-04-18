export default (...classes) => {
  let className = '';
  if (classes && classes.length && classes.length > 0) {
    let merge = false;
    for (let i = classes.length - 1; i >= 0; i--) {
      if (merge) {
        className = `${classes[i]} ${className}`;
        merge = true;
      } else {
        className = classes[i];
      }
    }
  }
  return className;
};