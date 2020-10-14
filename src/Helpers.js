export function paginate(direction) {
  this.setState((prevState) => ({ page: prevState.page + direction }));
}
