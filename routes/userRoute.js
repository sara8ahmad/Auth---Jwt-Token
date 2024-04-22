const express = require('express');

const { signup , login, getUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const { cookieJwtAuth } = require('../middleware/cookiesMiddleware');

const router = express.Router();
//router.use(protect)


// send announcment to the database

router.post('/signup', signup)
router.post('/login', login)
router.get('/getUser', protect , getUser)
module.exports = router;