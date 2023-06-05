const { logout } = require('../controllers/AccountController');
const { index, home } = require('../controllers/HomeController');

const router = require('express').Router();
const acccountRouter = require('./accountRouter');

router.get("/", index);
router.get("/home", home)
router.get("/logout", logout);
router.use("/account", acccountRouter);

module.exports = router;