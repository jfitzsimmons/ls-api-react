export function paginate(direction) {
  this.setState(prevState => {
    console.log(`paginate clicked- prevState: ${prevState.page} | direction: ${direction}`)
    return {page: prevState.page += direction}
  });
}
