const path = require('path');
const fs = require('fs');
const databasePath = path.join(__dirname, '..', './config/database/database.json');


async function addCube(cube) {

    await getAllCubes((cubes) => {
        cubes.push(cube);
        fs.writeFile(databasePath, JSON.stringify(cubes), err => {
            if (err) throw err;
        })
    });
}

async function getAllCubes(callback) {
    const databaseData = await fs.readFile(databasePath, 'utf8', (err, dbData) => {
        if (err) throw err;

        callback(JSON.parse(dbData));
    });
}

async function getCubeById(cubeId, callback) {
    await getAllCubes((cubes) => {
        for (const cube of cubes) {
            if (cube.id === cubeId) {
                callback(cube);
            }
        }
    });
}


module.exports = {
    addCube,
    getCubeById,
    getAllCubes
}

