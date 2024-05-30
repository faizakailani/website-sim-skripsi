class User {
  SaveToken(data) {
    localStorage.setItem("token", data);
  }

  Logout() {
    localStorage.clear();
  }
}
export default new User();
