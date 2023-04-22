const mutantSchema = require('./../models/mutant.model');
const mutantService = {};

mutantService.validateDNA = async (DNA) => {
    const regex = /^[ATCG]+$/g

    const isValid = DNA.every(dnaSeries => {
        return (dnaSeries.match(regex) && dnaSeries.length == DNA.length);//quizas tambien validar que sea una matriz de iguales lados
    });

    return isValid;
}

/**
 * Metodo para detectar si una persona es mutante
 */
mutantService.isMutant = async (DNA) => {
    let contMutantPattern = 0;
    const regexA = /[A]{4}/g;
    const regexT = /[T]{4}/g;
    const regexC = /[C]{4}/g;
    const regexG = /[G]{4}/g;

    for (let i = 0; i < DNA.length; i++) {

        var vertical = "";
        contPosicion = i;

        for (let j = 0; j < DNA.length; j++) {
            vertical = vertical + DNA[j][i];
            let contPosicion = 0;
            let diagonal = "";

            for (let k = 0; k < DNA.length; k++) {
                const cell = DNA[j + contPosicion]?.[i + contPosicion];
                if (cell !== undefined) {
                    diagonal = diagonal + cell;
                }
                contPosicion++;
            }
            if (regexA.test(diagonal) || regexT.test(diagonal) || regexC.test(diagonal) || regexG.test(diagonal)) {
                contMutantPattern++;
            }

        }
        console.log(DNA[i])
        if (regexA.test(DNA[i]) || regexT.test(DNA[i]) || regexC.test(DNA[i]) || regexG.test(DNA[i])) {
            contMutantPattern++;
        }

        if (regexA.test(vertical) || regexT.test(vertical) || regexC.test(vertical) || regexG.test(vertical)) {
            contMutantPattern++;
        }
    }
    console.log(contMutantPattern)
    return contMutantPattern > 1;
}

mutantService.saveDNA = async (DNA, isMutant) => {
    const existsDNA = await mutantSchema.findOne({ dnaSequence: DNA });
    if (existsDNA) {
        return
    }
    const mutant = mutantSchema({
        registrationDate: Date.now(),
        dnaSequence: DNA,
        isMutant: isMutant
    });
    await mutant.save();
}

mutantService.getAllDNA = async () => {

    return await mutantSchema.find();
}
module.exports = mutantService;