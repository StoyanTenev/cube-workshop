const {Cube} = require('../models/cubeModel');
const databaseController = require('../controllers/databaseController')

function createCube(cubeData) {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = cubeData;

    const cube = new Cube(name, description, imageUrl, difficultyLevel);

    databaseController.addCube(cube);
}

function test(){
    const test = databaseController.getCubeById('5bd5eec6-ac00-4b99-85b4-ded737457110');
    console.log(test)
}

module.exports={
    createCube,
    test
}