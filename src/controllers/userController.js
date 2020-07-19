import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    //TO-DO save to DB
    //console.log(res.locals.user);
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (e) {
      console.log(e);
      res.redirect(routes.join);
    }
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const facebookLogin = passport.authenticate("facebook");

// eslint-disable-next-line consistent-return
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id: githubId, email, name, login, avatar_url: avatarUrl },
  } = profile;

  try {
    const user = await User.findOne({ email: email || login });
    if (user) {
      console.log("update user..");
      user.githubId = githubId;
      user.save();
      return cb(null, user);
    }
    console.log("create user..");
    const newUser = await User.create({
      email: email || login,
      name: name || login,
      avatarUrl,
      githubId,
    });
    return cb(null, newUser);
  } catch (e) {
    cb(e);
  }
  /* User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  }); */
};

// eslint-disable-next-line consistent-return
export const facebookLoginCallback = async (_, __, profile, cb) => {
  console.log(profile);
  const {
    _json: {
      picture: { data },
    },
  } = profile;
  console.log(data);
  const {
    _json: { id: facebookId, email, name },
  } = profile;

  try {
    const user = await User.findOne({ email: email || facebookId });
    if (user) {
      console.log("update user..");
      user.avatarUrl = `https://graph.facebook.com/${facebookId}/picture?type=large`;
      user.facebookId = facebookId;
      user.save();
      return cb(null, user);
    }
    console.log("create user..");
    const newUser = await User.create({
      email: email || facebookId,
      name,
      avatarUrl: `https://graph.facebook.com/${facebookId}/picture?type=large`,
      facebookId,
    });
    return cb(null, newUser);
  } catch (e) {
    cb(e);
  }
};

export const githubPostLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookPostLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
  //res.render("logout", { pageTitle: "Log Out" });
};

//export const users = (req, res) => res.render("users");
export const getMe = (req, res) => {
  console.log(req.user);
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await User.findById(id).populate("Video");
    console.log(user);
    res.render("userDetail", {
      pageTitle: "User Detail",
      user,
    });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => {
  if (!req.user) {
    res.redirect(routes.home);
  }
  console.log(req.user);
  res.render("editProfile", { pageTitle: "Edit Profile", user: req.user });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;

  try {
    //console.log(">>>>>> ", req.user);
    console.log(req.user.id);

    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? `/${file.path}` : req.user.avatarUrl,
    });

    res.redirect(`${routes.users}${routes.me}`);
  } catch (e) {
    console.log(e);
    res.redirect(`${routes.users}${routes.editProfile}`);
  }
  console.log(req.user);
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;

  if (newPassword1 !== newPassword) {
    res.redirect(`${routes.users}${routes.changePassword}`);
  }
  console.log(req.body);
  await req.user.changePassword(oldPassword, newPassword);
  res.redirect(`${routes.users}${routes.me}`);
};
