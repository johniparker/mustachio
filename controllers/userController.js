const User = require("../models/User");

exports.getLogin = (req, res, next) => {
  res.render("user/login", { pageTitle: "Login", path: "/user/login" });
};

exports.getSignup = (req, res, next) => {
  res.render("user/signup", { pageTitle: "Sign Up", path: "/user/signup" });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const enteredPassword = req.body.password;
  console.log("EMAIL: ", email);
  console.log("PASSWORD: ", enteredPassword);
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("no user found");
      return res.render("user/login", {
        pageTitle: "Login",
        path: "/user/login",
        message: "User not found.",
        entries: req.body,
      });
    }
    console.log("found user!!\n", user);
    const passwordMatch = await user.validatePassword(enteredPassword);

    console.log("Entered Password:", enteredPassword);
    console.log("Stored Hashed Password:", user.password);
    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      console.log("password does not match");
      return res.render("user/login", {
        pageTitle: "Login",
        path: "/user/login",
        message: "Invalid Password.",
        entries: req.body,
      });
    }

    if (user && passwordMatch) {
      console.log("LOGIN SUCCESSFULL!!!");
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((err) => {
        res.redirect("/");
      });
    }
  } catch (err) {
    console.log(err);
    return res.render("user/login", {
      pageTitle: "Login",
      path: "/user/login",
      message: "Something went wrong. Please try again.",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
};

exports.postSignup = async (req, res, next) => {
  // Retrieve data from the form
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Use static method of model to check if the email is unique
    const emailUnique = await User.checkEmailUnique(email);

    if (!emailUnique) {
      return res.render("user/signup", {
        pageTitle: "Signup",
        path: "/user/signup",
        message:
          "Email address already belongs to another user.  Please choose a different one.",
        entries: req.body,
      });
    }

    // Create the new user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      admin: false
    });
    await user.save();
    console.log("successfully created user:\n", user);
    res.redirect("/user/login");
  } catch (err) {
    console.log(err);
    res.render("user/signup", {
      pageTitle: "Signup",
      path: "/user/signup",
      message: "Oops!  Please correct the following errors and try again:",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.addFavoriteStyle = async (req, res, next) => {
  const styleId = req.body.styleId;
  const userId = req.session.user._id;

  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favoriteStyles: styleId },
    });
    res.redirect("/user/favorite-styles");
  } catch (err) {
    console.log(err);
  }
};

exports.getFavoriteStyles = (req, res, next) => {
  const userId = req.session.user._id;
  User.findOne({ _id: userId }).populate("favoriteStyles")
    .then(user => {
      console.log('FAVORITE STYLES: ', user.favoriteStyles);
      res.render('favorite-styles', {
        pageTitle: 'Your Favorite Styles',
        path: '/user/favorite-styles',
        favoriteStyles: user.favoriteStyles
      });
    })
    .catch(err => {
      console.log(err);
    });
  
};
