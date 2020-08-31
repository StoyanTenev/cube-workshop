const Cube = require('../models/cubeModel');
const Accessory = require('../models/accessoryModel');
const databaseController = require('../controllers/databaseController');

async function createCube(cubeData) {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = cubeData;
    const cube = new Cube({name, description, imageUrl, difficulty});
    await databaseController.addModel(cube);
}

async function hasAllAccessory(cubeId, cube) {
    const allAccessory = await databaseController.getAllModels(Accessory);
    const cubeAccessories = cube.accessories;

    for (const accessory of allAccessory) {
        if (!cubeAccessories.includes(accessory._id)) {
            return false;
        }
    }
    return true;
}


module.exports = {
    createCube,
    hasAllAccessory
}