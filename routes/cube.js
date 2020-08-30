const {Router} = require('express');
const router = Router();
const databaseController = require('../controllers/databaseController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const Cube = require('../models/cubeModel');

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
 * Edit cube
 */
router.get('/edit/:id', async (req, res) => {
    const cube = await databaseController.getModelById(req.params.id, Cube);
    res.render('editCubePage', {
        title: 'Edit Cube | Cube Workshop',
        cube: cube
    });
});

/**
 * Delete cube
 */
router.get('/delete/:id', (req, res) => {
    res.render('deleteCubePage', {
        title: 'Delete Cube | Cube Workshop'
    });
});


/**
 * Details cube by id
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

module.exports = router;
