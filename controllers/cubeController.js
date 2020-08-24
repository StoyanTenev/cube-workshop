const Cube = require('../models/cubeModel');
const databaseController = require('../controllers/databaseController')

async function createCube(cubeData) {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = cubeData;
    const cube = new Cube({name, description, imageUrl, difficulty});
    await databaseController.addCube(cube);
}


module.exports = {
    createCube,
}