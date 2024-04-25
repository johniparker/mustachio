const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  dateResponded: {
    type: Date
  },
  response: {
    type: String,
    required: false
  },
});

contactRequestSchema.virtual('shortMessage')
  .get(function() {
    return `${this.message.split(/\s+/).slice(0, 10).join(" ")}...`;
  })
  .set(function(value) {
    throw new Error("Do not try to set the 'shortMessage' value");
  });

module.exports = mongoose.model("ContactRequest", contactRequestSchema);
