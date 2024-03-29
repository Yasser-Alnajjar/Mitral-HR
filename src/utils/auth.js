// function isLoggedIn() {
//   if (typeof window !== "undefined") {
//     let currentUser = JSON.parse(localStorage.getItem("user"));
//     return currentUser;
//   }
// }
// function authHeader() {
//   if (typeof window !== "undefined") {
//     let headerAuth = JSON.parse(localStorage.getItem("user"));
//     if (headerAuth && headerAuth.token) return `Bearer ${headerAuth.token}`;
//     return {};
//   }
// }
// export const user = isLoggedIn();
// export const header = authHeader();
// ! Dummy
function isLoggedIn() {
  if (typeof window !== "undefined") {
    let currentUser = JSON.parse(localStorage.getItem("user")) || {
      user: {
        email: "Gest@gmail.com",
        department: "Gest",
        branch: "Gest",
        role: "Gest",
        name: "Gest",
        address: "Gest",
        salary: "Gest",
        phone: "Gest",
        rate: "Gest",
        id: 0,
      },
    };
    return currentUser;
  }
}
function authHeader() {
  if (typeof window !== "undefined") {
    let headerAuth = JSON.parse(localStorage.getItem("user"));
    if (headerAuth && headerAuth.accessToken)
      return `Bearer ${headerAuth.accessToken}`;
    return {};
  }
}
export const user = isLoggedIn();
export const header = authHeader();
