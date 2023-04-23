const mutantController = require('../src/controllers/mutant.controller');
const mutantService = require('../src/services/mutant.service');
const server = require('../src/app');
const request = require('supertest');

describe('validate the DNA sequence', () => {

    test('incorrectSerie', async () => {
        expect.assertions(1);
        return mutantService.validateDNA(["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CACCCTA", "TCACTG"])
            .then(res => {
                expect(res).toBe(false);
            });
    });

    test('incorrectSerie', async () => {
        expect.assertions(1);
        return mutantService.validateDNA(["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG"])
            .then(res => {
                expect(res).toBe(false);
            });
    });

    test('incorrectCharacter', async () => {
        expect.assertions(1);
        return mutantService.validateDNA(["ATGCGA","CAGTGC","TTATGT","AGPAGG","CACCCT","TCACTG"])
            .then(res => {
                expect(res).toBe(false);
            });
    });

    test('correctSequence', async () => {
        expect.assertions(1);
        return mutantService.validateDNA(["ATGCGA","CAGTGC","TTATGT","AGTAGG","CACCCT","TCACTG"])
            .then(res => {
                expect(res).toBe(true);
            });
    });

    test('correctSequence1', async () => {
        expect.assertions(1);
        return mutantService.validateDNA(["ATGC","CAGT","TTAT","AGTA"])
            .then(res => {
                expect(res).toBe(true);
            });
    });

});

describe('check if the DNA sequence is mutant', () => {
    test('notMutant_Zero_Sequence', async () => {
        expect.assertions(1);
        return mutantService.isMutant(["TTGCGA","CAGTGC","TTATGT","AGAATG","CACCCT","TCACTG"])
            .then(res => {
                expect(res).toBe(false);
            });
    });

    test('notMutant_One_Sequence', async () => {
        expect.assertions(1);
        return mutantService.isMutant(["ATGCGA","CAGTGC","TTATGT","AGAATG","CACCCT","TCACTG"])
            .then(res => {
                expect(res).toBe(false);
            });
    });

    test('mutant_Two_Sequence', async () => {
        expect.assertions(1);
        return mutantService.isMutant(["ATGCGA","CAGTGC","TTATGT","TAAATG","CCCCGT","TCACTG"])
            .then(res => {
                expect(res).toBe(true);
            });
    });

    test('mutant_Three_Sequence', async () => {
        expect.assertions(1);
        return mutantService.isMutant(["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"])
            .then(res => {
                expect(res).toBe(true);
            });
    });
});

describe('GET /stats', () => {
    test('shouldRespondWith200Code', async () => {
        const response = await request(server.app).get('/stats');
        expect(response.statusCode).toBe(200);
    });

    test('shouldRespondWitObject', async () => {
        const response = await request(server.app).get('/stats');
        expect(response.body).toBeInstanceOf(Object);
    })
});


describe('POST /mutant', () => {
    test('shouldRespondWith200CodeAndOK', async () => {
        const response = await request(server.app).post('/mutant').send({"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]});
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('OK');
    });

    test('shouldRespondWith403CodeAndForbidden', async () => {
        const response = await request(server.app).post('/mutant').send({"dna": ["TTGCAA","CAGTGC","TTATGT","AGAAGG","CACCTA","TCACTG"]});
        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('Forbidden');
    });

    test('shouldRespondWith400CodeAndError', async () => {
        const response = await request(server.app).post('/mutant').send({"dna": ["TTGCAA","CAGTGC","TTATGT","AAAGG","CACCTA","TCACTG"]});
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('The provided DNA isnt valid');
    });
});