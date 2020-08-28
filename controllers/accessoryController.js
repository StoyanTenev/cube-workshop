const Accessory = require('../models/accessoryModel');
const databaseController = require('../controllers/databaseController');

async function createAccessory(accessoryData) {
    const {
        name,
        description,
        imageUrl,
    } = accessoryData;

    const accessory = new Accessory({name, description, imageUrl});
    await databaseController.addModel(accessory);
}

async function getAccessoriesFromCube(cubeAccessories) {
    const accessories = [];
    for (const accessoryId of cubeAccessories) {
        accessories.push(await databaseController.getModelById(accessoryId, Accessory));
    }
    return accessories;
}


module.exports = {
    createAccessory,
    getAccessoriesFromCube
}