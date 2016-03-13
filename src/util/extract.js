export default function extract(elmt) {
  return {
    component: elmt.type,
    state: elmt.props,
  };
}
