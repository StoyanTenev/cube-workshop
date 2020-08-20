const {Router} = require('express')
const {Cube} = require('../models/cubeModel')
const cubeController = require('../controllers/cubeController')
const databaseController = require('../controllers/databaseController')
const router = Router()

router.get('/', (req, res) => {
    databaseController.getAllCubes((cubes) => {
        res.render('index', {
            title: 'Cube Workshop',
            cubes: cubes
        })
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop'
    })
})

router.post('/create', (req, res) => {
    cubeController.createCube(req.body);
    res.redirect('/');
})

router.get('/details:id', (req, res) => {
    const cubeId = (req.params.id).substring(1);

    databaseController.getCubeById(cubeId, (cube) => {
        res.render('details', {
            title: 'Details | Cube Workshop',
            cube: cube
        })
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube Workshop'
    })
})

module.exports = router 