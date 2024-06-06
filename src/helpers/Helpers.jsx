/* eslint-disable react-refresh/only-export-components */
export function AuthHeaders() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return {
      Authorization: "Bearer " + token,
    };
  } else {
    return {};
  }
}
