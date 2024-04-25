const MustacheStyle = require("../models/MustacheStyle");

exports.getStyles = async (req, res, next) => {
  try {
    const styles = await MustacheStyle.find();
    console.log('got the styles!\n', styles)
    res.render("gallery", { pageTitle: "Gallery", styles, path: req.baseUrl });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getSingleStyle = async (req, res, next) => {
  const titleSlug = req.params.titleSlug;
  console.log('titleslug: ', titleSlug);
  try {
    const style = await MustacheStyle.findOne({ titleSlug: titleSlug });
    console.log('\nGOT THE STYLE!!\n', style);
    res.render("gallery-single-post", {
      pageTitle: style.title,
      style,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getNewStyle = (req, res, next) => {
  if (res.locals.user && res.locals.admin) {
    res.render('new-style', {
      pageTitle: 'New Style',
      path: '/styles/new-style'
    })
  } else {
    res.redirect('/styles');
  }
  
}

exports.postNewStyle = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageFile = req.file;
  
  console.log('IMAGE FILE: ', imageFile);

  const imageURL = 'images/' + imageFile.originalname;
  console.log('IMAGE URL: ', imageURL);

  const newStyle = new MustacheStyle({
    title: title,
    description: description,
    imageURL: imageURL
  });

  console.log('NEW STYLE: ', newStyle)
  await newStyle.save();
  console.log('STYLE SAVED TO DATABASE SUCCESSFULLY');
  
  return res.redirect("/styles");
}