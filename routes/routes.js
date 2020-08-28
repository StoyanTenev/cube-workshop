const {Router} = require('express');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const databaseController = require('../controllers/databaseController');
const Cube = require('../models/cubeModel');
const Accessory = require('../models/accessoryModel');
const router = Router();

/**
 * Home
 */
router.get('/', async (req, res) => {
    const cubes = await databaseController.getAllModels(Cube);
    res.render('index', {
        title: 'Cube Workshop',
        cubes: cubes
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
 * Create Cube
 */
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop'
    });
});

router.post('/create', async (req, res) => {
    await cubeController.createCube(req.body);
    res.redirect('/');
});

/**
 * Create Accessory
 */
router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory | Cube Workshop'
    });
});

router.post('/create/accessory', async (req, res) => {
    await accessoryController.createAccessory(req.body);
    res.redirect('/');
});


/**
 * Details
 */
router.get('/details/:id', async (req, res) => {
    const cube = await databaseController.getModelById(req.params.id, Cube);
    const accessories = await accessoryController.getAccessoriesFromCube(cube.accessories);

    res.render('details', {
        title: 'Details | Cube Workshop',
        cube: cube,
        accessories: accessories
    });
});

/**
 * Attach Accessory
 */

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await databaseController.getModelById(req.params.id, Cube);
    const accessories = await databaseController.getAllModels(Accessory);
    const hasAllAccessory = await cubeController.hasAllAccessory(cube._id, cube);

    res.render('attachAccessory', {
        title: 'Attach Accessory | Cube Workshop',
        cube: cube,
        accessories: accessories,
        hasAllAccessory: hasAllAccessory
    });
});

router.post('/attach/accessory/:id', async (req, res) => {
    await databaseController.attachModel(req.params.id, Cube, req.body.accessory, Accessory);
    res.redirect('/');
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