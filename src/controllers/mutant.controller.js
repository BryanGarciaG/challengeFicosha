const mutantService = require('./../services/mutant.service');
const { validationResult } = require('express-validator');
const mutantController = {};

mutantController.checkMutant = async (req, res) => {
    try {
        const bodyErrors = validationResult(req);
        // if(!bodyErrors.isEmpty()){
        //     return res.status(400).send(bodyErrors.array()[0].msg);
        // }
        const {
            dna
        } = req.body;

        const validDNA = await mutantService.validateDNA(dna);
        if (!validDNA) {
            return res.status(400).send('The provided DNA isnt valid');
        }

        const isMutant = await mutantService.isMutant(dna);

        await mutantService.saveDNA(dna, isMutant);

        if (isMutant) {
            res.status(200).send('OK');
        } else {
            res.status(403).send('Forbidden');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

mutantController.stats = async (req, res) => {
    try {
        const humans = await mutantService.getAllDNA();
        const mutants = humans.filter(x => x.isMutant).length;
        const stats = {
            count_mutant_dna: mutants,
            count_human_dna: humans.length,
            ratio: mutants / humans.length
        }

        res.status(200).send(stats);

    } catch (error) {
        return res.status(500).send(error.message);
    }

}

module.exports = mutantController;