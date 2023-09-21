const express = require('express');
const genresRouter = require('./genres.router');
const actorsRouter = require('./actors.router');
const directorsRouter = require('./directors.router');
const moviesRouter = require('./movies.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genresRouter)
router.use('/actors', actorsRouter)
router.use('/directors', directorsRouter)
router.use('/movies', moviesRouter)


module.exports = router;