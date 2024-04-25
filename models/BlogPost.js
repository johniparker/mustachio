const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    set: function (value) {
      this.titleSlug = slugify(value, { lower: true, trim: true });
      return value;
    },
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /.*\.(jpg|png)$/i.test(v);
      },
      message: props => `${props.value} is not a valid file name! It must end with .jpg or .png`
    }
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  titleSlug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
