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

const editCube = async (cubeData, cubeId, Model) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = cubeData

    await Model.findOneAndUpdate({_id: cubeId}, {
        name: name,
        description: description,
        imageUrl: imageUrl,
        difficulty: difficulty
    });
}

const deleteCube = async (cubeId, Model) => {
    await Model.deleteOne({_id: cubeId});
}


module.exports = {
    addModel,
    getModelById,
    getAllModels,
    attachModel,
    editCube,
    deleteCube
};

