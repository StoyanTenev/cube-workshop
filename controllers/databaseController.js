const addModel = async (Model) => {
    await Model.save().catch(err => console.error(err));
};

const getAllModels = async (Model) => {
    return await Model.find().lean();
};

const getModelById = async (modelId, Model) => {
    return await Model.findById(modelId);
};

const attachModel = async (modelToAttachId, modelToAttach, attachModelId, attachModel) => {

    const model = await modelToAttach.findById(modelToAttachId);
    const accessories = model.accessories;

    if (!accessories.includes(attachModelId)) {
        accessories.push(attachModelId);

        await modelToAttach.findByIdAndUpdate(modelToAttachId, {
            accessories: accessories
        });

        await attachModel.findByIdAndUpdate(attachModelId, {
            cubes: [modelToAttachId]
        })
    }
};


module.exports = {
    addModel,
    getModelById,
    getAllModels,
    attachModel,
};

