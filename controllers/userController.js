const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = data => {
    return jwt.sign(data, process.env.PRIVATE_KEY)
}

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

    const token = generateToken({
        userId: userObject._id,
        username: userObject.username
    });

    res.cookie('aid', token);

    return true;
}

const userAccess = async (req, res) => {
    const {
        username,
        password
    } = req.body

    try {
        const user = await User.findOne({username});
        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const token = generateToken({
                userId: user._id,
                username: username
            });

            res.cookie('aid', token)
        }

        return checkPassword;
    } catch (e) {
        return e.message;
    }
}

const checkAuthentication = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        res.isAuth = false;
        next();
    } else {
        try {
            const decodedObj = jwt.verify(token, process.env.PRIVATE_KEY);
            res.isAuth = true;
            next();
        } catch (e) {
            return res.redirect('/');
        }
    }
}

module.exports = {
    createUser,
    userAccess,
    checkAuthentication
};
