const catchError = require('../utils/catchError');
const Directors = require('../models/Directors');

const getAll = catchError(async (req, res) => {
    const directors = await Directors.findAll();
    return res.json(directors);
});

const create = catchError(async (req, res) => {
    const directors = await Directors.create(req.body);
    return res.status(201).json(directors);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const directors = await Directors.findByPk(id);
    return res.json(directors);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Directors.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const director = await Directors.update(req.body, { where: {id}, returning: true });
    if (director[0] === 0) return res.sendStatus(404);
    return res.json(director[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};