function UserAuthentication() {
  const aut =
    localStorage.getItem("token") && localStorage.getItem("firstName")
      ? true
      : false;
  return aut;
}
export default UserAuthentication;
