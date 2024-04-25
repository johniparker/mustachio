const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const mustacheStyleSchema = new Schema({
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
  description: {
    type: String,
    required: true,
  },
  titleSlug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MustacheStyle", mustacheStyleSchema, "mustachestyles");
