const Cube = require('../models/cubeModel');

const addCube = async (Cube) => {
    await Cube.save().catch(err => console.error(err));
}

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    return cubes;
}

const getCubeById = async (cubeId) => {
    const cube = await Cube.findById(cubeId);
    return cube;
}


module.exports = {
    addCube,
    getCubeById,
    getAllCubes
}

