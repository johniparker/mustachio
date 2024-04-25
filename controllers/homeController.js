exports.getHome = (req, res, next) => {
   // Retrieve user first name if a user exists in the session.  Otherwise, set it to null.
   const firstName = req.session.user ? req.session.user.firstName : null
   
  res.render("index", { pageTitle: "Home", path: req.path, firstName: firstName });
};

exports.getAbout = (req, res, next) => {
  res.render("about", { pageTitle: "About", path: req.path });
};
