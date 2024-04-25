const BlogPost = require("../models/BlogPost");

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogPost.find({}).sort({ postDate: -1 });
    console.log('found blogs!! blogs:\n', blogs)
    res.render("blog", { pageTitle: "Blog", blogs, path: req.baseUrl });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getSingleBlog = async (req, res, next) => {
  const { titleSlug } = req.params;
  try {
    const blog = await BlogPost.findOne({ titleSlug: titleSlug });
    console.log('blog found!! blog:\n', blog)
    res.render("blog-single-post", {
      pageTitle: blog.title,
      blog,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};
