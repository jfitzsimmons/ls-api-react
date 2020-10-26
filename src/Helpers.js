export function paginate(direction) {
  this.setState((prevState) => ({ page: prevState.page + direction }));
}

export function removeDuplicates(array, key) {
  return array.filter((obj, index, self) => index === self.findIndex((el) => el[key] === obj[key]));
}
