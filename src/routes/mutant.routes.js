const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const mutantController = require('./../controllers/mutant.controller');

router.post('/mutant',
    body('dna','No se ha especificado el valor dna').not().isEmpty(),
    body('dna','No se ha especificado el valor dna').not().exists(),
    mutantController.checkMutant
);

router.get('/stats', mutantController.stats)


module.exports = router;