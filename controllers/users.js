const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
  res.render("./user/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const regiteredUser = await User.register(newUser, password);
    req.login(regiteredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to wanderLust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("./user/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to WanderLust! You are logged in!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("sucess", "you are loggedd out now");
    res.redirect("/listings");
  });
};
