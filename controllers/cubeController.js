const Cube = require('../models/cubeModel');
const Accessory = require('../models/accessoryModel');
const databaseController = require('../controllers/databaseController');
const jwt = require('jsonwebtoken');

async function createCube(req,res) {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    const token = req.cookies['aid'];

    const creator= jwt.verify(token,process.env.PRIVATE_KEY);
    const cube = new Cube({name, description, imageUrl, difficulty,creatorId: creator.userId});
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