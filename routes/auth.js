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

router.get('/logout', (req, res) => {
    res.redirect('/')
})

module.exports = router;