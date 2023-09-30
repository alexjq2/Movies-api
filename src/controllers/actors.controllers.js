const catchError = require('../utils/catchError');
const Actors = require('../models/Actors');

const getAll = catchError(async (req, res) => {
    const actor = await Actors.findAll();
    return res.json(actor);
});

const create = catchError(async (req, res) => {
    const actor = await Actors.create(req.body);
    return res.status(201).json(actor);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const actor = await Actors.findByPk(id);
    return res.json(actor);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Actors.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const actor = await Actors.update(req.body, { where: {id}, returning: true });
    if (actor[0] === 0) return res.sendStatus(404);
    return res.json(actor[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};