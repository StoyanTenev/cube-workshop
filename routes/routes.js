const {Router} = require('express');
const router = Router();
const databaseController = require('../controllers/databaseController');
const Cube = require('../models/cubeModel');
const {checkAuthentication} = require('../controllers/userController');

/**
 * Home
 */
router.get('/', checkAuthentication, async (req, res) => {
    const cubes = await databaseController.getAllModels(Cube);
    res.render('index', {
        title: 'Cube Workshop',
        cubes: cubes,
        isAuth: res.isAuth
    });
});

/**
 * About
 */
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
});

/**
 * Test
 */
router.get('/test', (req, res) => {
    res.render('attachAccessory', {
        title: 'Test | Cube Workshop'
    });
});

/**
 * Page not found 404
 */
router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube Workshop'
    });
});

module.exports = router;