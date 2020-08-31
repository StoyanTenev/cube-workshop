const databaseController = require('../controllers/databaseController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body

    if (password !== repeatPassword) {
        return res.redirect('/signup', 401);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hashPassword
    });

    const userObject = await user.save();

    const token = jwt.sign({
        userId: userObject._id,
        username: userObject.username
    }, process.env.privateKey);

    res.cookie('aid', token);

    return true;
}

module.exports = {
    createUser
};
