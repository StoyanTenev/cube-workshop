const addModel = async (Model) => {
    await Model.save().catch(err => console.error(err));
};

const getAllModels = async (Model) => {
    return await Model.find().lean();
};

const getModelById = async (modelId, Model) => {
    return await Model.findById(modelId);
};

const attachModel = async (cubeId, Cube, accessoryId, Accessory) => {

    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accessoryId]
        }
    });

    await Accessory.findByIdAndUpdate(accessoryId, {
        $addToSet: {
            cubes: [cubeId]
        }
    })
};


module.exports = {
    addModel,
    getModelById,
    getAllModels,
    attachModel,
};

