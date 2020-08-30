const {Router} = require('express');
const router = Router();

router.get('/signup', (req, res) => {
    res.render('registerPage',{
        title: 'SignUp | Cube Workshop'
    });
})

router.get('/login', (req, res) => {
    res.render('loginPage',{
        title: 'LogIn | Cube Workshop'
    });
})

router.get('/logout', (req, res) => {
    res.redirect('/')
})


module.exports = router;