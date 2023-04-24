const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const mutantController = require('./../controllers/mutant.controller');



// Check Mutant
/**
 * @swagger
 * components:
 *  schemas:
 *    Mutant:
 *      type: object
 *      properties:
 *        dna:
 *          type: array
 *          description: Recibe la serie del ADN de un humano para evaluar si es mutante
 *      required:
 *        - dna
 *      example:
 *        dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
 */
/**
 * @swagger
 * /mutant:
 *  post:
 *    summary: Determina si un humano es mutante.
 *    tags: [Mutant]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Mutant'
 *    responses:
 *      200:
 *        description: OK
 *      403:
 *        description: Forbidden
 */
router.post('/mutant',
    body('dna','No se ha especificado el valor dna').not().isEmpty(),
    body('dna','No se ha especificado el valor dna').not().exists(),
    mutantController.checkMutant
);


// get all DNA Validated
/**
 * @swagger
 * /stats:
 *  get:
 *    summary: Obtiene las estadisticas de los ADNs evaluados
 *    tags: [Mutant]
 *    responses:
 *      200:
 *        description: OK
 *      403:
 *        description: Forbidden
 */
router.get('/stats', mutantController.stats)


module.exports = router;