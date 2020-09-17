const {Router} = require('express');
const router = Router();
const {checkAuthentication} = require('../controllers/userController');
const databaseController = require('../controllers/databaseController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const Cube = require('../models/cubeModel');

/**
 * Create Cube
 */
router.get('/create', checkAuthentication, (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop',
        isAuth: res.isAuth
    });
});

router.post('/create', async (req, res) => {
    await cubeController.createCube(req, res);
    res.redirect('/');
});

/**
 * Edit cube
 */
router.get('/edit/:id', checkAuthentication, async (req, res) => {
    const cube = await databaseController.getModelById(req.params.id, Cube);
    res.render('editCubePage', {
        title: 'Edit Cube | Cube Workshop',
        cube: cube,
        isAuth: res.isAuth
    });
});

router.patch('/edit/:id', checkAuthentication, async (req, res) => {
    await cubeController.editCube(req.body, req.params.id, Cube);
    res.redirect('/');
})

/**
 * Delete cube
 */
router.get('/delete/:id', checkAuthentication, async (req, res) => {
    const cube = await databaseController.getModelById(req.params.id, Cube);
    res.render('deleteCubePage', {
        title: 'Delete Cube | Cube Workshop',
        cube: cube,
        isAuth: res.isAuth
    });
});

router.delete('/delete/:id', checkAuthentication, async (req, res) => {
    await cubeController.deleteCube(req.params.id);
    res.redirect('/');
})
/**
 * Details cube by id
 */
router.get('/details/:id', checkAuthentication, async (req, res) => {
    const cube = await databaseController.getModelById(req.params.id, Cube);
    const accessories = await accessoryController.getAccessoriesFromCube(cube.accessories);

    res.render('details', {
        title: 'Details | Cube Workshop',
        cube: cube,
        accessories: accessories,
        isAuth: res.isAuth
    });
});

module.exports = router;
