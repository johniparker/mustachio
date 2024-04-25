const path = require("path");

const jwt = require("jsonwebtoken");

const Style = require("../models/MustacheStyle");

imagesPath = path.join(__dirname, "public", "images");

const SECRET_KEY = "secret-key";

exports.getStyles = async (req, res, next) => {
  const styleData = await Style.find();
  console.log("STYLES:\n", styleData);
  res.json({
    message: "Retrieved styles successfully!",
    data: styleData,
  });
};

exports.getToken = (req, res, next) => {
  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
    SECRET_KEY
  );
  res.json({ token: token });
};

exports.verifyToken = (req, res, next) => {
    token = req.query.token;
    console.log(token);
    try {
        jwt.verify(token, SECRET_KEY);
        console.log('verified token!!')
        next();
    } catch (error) {
        console.log('verification failed', error.message);
        return res.status(401).json({ error: "Invalid Token"});
    }
}
