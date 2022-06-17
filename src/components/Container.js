function Container({ children, className = "container" }) {
  return <div className={className}>{children}</div>;
}
export default Container;
