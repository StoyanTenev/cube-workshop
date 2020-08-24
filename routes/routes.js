const {Router} = require('express')
const Cube = require('../models/cubeModel')
const cubeController = require('../controllers/cubeController')
const databaseController = require('../controllers/databaseController')
const router = Router()

/**
 * Home
 */
router.get('/', async (req, res) => {
    const cubes = await databaseController.getAllCubes();
    res.render('index', {
        title: 'Cube Workshop',
        cubes: cubes
    });
})

/**
 * About
 */
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
})

/**
 * Create Cube
 */
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop'
    });
})

router.post('/create', async (req, res) => {
    await cubeController.createCube(req.body);
    res.redirect('/');
});

/**
 * Create Accessory
 */
router.get('/create/accessory', async (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory | Cube Workshop'
    });
})


/**
 * Details
 */
router.get('/details:id', async (req, res) => {
    const cubeId = (req.params.id).substring(1);

    const cubeById = await databaseController.getCubeById(cubeId);
    res.render('details', {
        title: 'Details | Cube Workshop',
        cube: cubeById
    });
})

/**
 * Page not found 404
 */
router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube Workshop'
    });
})

module.exports = router 