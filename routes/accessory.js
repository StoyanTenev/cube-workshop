const {Router} = require('express');
const router = Router();
const databaseController = require('../controllers/databaseController');
const accessoryController = require('../controllers/accessoryController');
const cubeController = require('../controllers/cubeController')
const Cube = require('../models/cubeModel');
const Accessory = require('../models/accessoryModel');
const {checkAuthentication} = require('../controllers/userController');


/**
 * Create Accessory
 */
router.get('/create/accessory', checkAuthentication, (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory | Cube Workshop',
        isAuth: res.isAuth
    });
});

router.post('/create/accessory', async (req, res) => {
    await accessoryController.createAccessory(req.body);
    res.redirect('/');
});

/**
 * Attach Accessory
 */

router.get('/attach/accessory/:id', checkAuthentication, async (req, res) => {
    const cube = await databaseController.getModelById(req.params.id, Cube);
    const accessories = await databaseController.getAllModels(Accessory);
    const hasAllAccessory = await cubeController.hasAllAccessory(cube._id, cube);

    res.render('attachAccessory', {
        title: 'Attach Accessory | Cube Workshop',
        cube: cube,
        accessories: accessories,
        hasAllAccessory: hasAllAccessory,
        isAuth: res.isAuth
    });
});

router.post('/attach/accessory/:id', async (req, res) => {
    await databaseController.attachModel(req.params.id, Cube, req.body.accessory, Accessory);
    res.redirect('/');
});

module.exports = router;