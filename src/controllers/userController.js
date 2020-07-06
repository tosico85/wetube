import routes from "../routes";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    //TO-DO save to DB
    console.log(res.locals.user);
    res.locals.user.isAuthentication = true;
    res.redirect(routes.home);
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = (req, res) => {
  res.locals.user.isAuthentication = true;
  console.log(res.locals.user);
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  res.redirect(routes.home);
  //res.render("logout", { pageTitle: "Log Out" });
};

//export const users = (req, res) => res.render("users");
export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail" });
};
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
