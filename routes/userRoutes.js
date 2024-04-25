const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get("/login", userController.getLogin);

router.get("/signup", userController.getSignup);

router.post("/login", userController.postLogin);

router.post("/signup", userController.postSignup);

router.get("/logout", userController.getLogout);

router.post('/add-favorite', userController.addFavoriteStyle);

router.get('/favorite-styles', userController.getFavoriteStyles);

module.exports = router;