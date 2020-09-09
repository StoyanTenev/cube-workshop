const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.get('/signup', (req, res) => {
    res.render('registerPage', {
        title: 'SignUp | Cube Workshop'
    });
})

router.post('/signup', async (req, res) => {
    const status = await userController.createUser(req, res);

    if (status) {
        res.redirect('/');
    }

})

router.get('/login', (req, res) => {
    res.render('loginPage', {
        title: 'LogIn | Cube Workshop'
    });
})

router.post('/login', async (req, res) => {
    const status = await userController.userAccess(req, res);

    if (status) {
        res.redirect('/');
    }else {
        res.redirect('/login');
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('aid');
    res.redirect('/')
})

module.exports = router;