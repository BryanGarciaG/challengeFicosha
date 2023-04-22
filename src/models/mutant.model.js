const mongoose = require('mongoose');
const schema = mongoose.Schema;

const mutantSchema = new schema({
    registrationDate: {
        type: Date,
        required: true
    },
    dnaSequence: {
        type: Array,
        required: true
    },
    isMutant: {
        type: Boolean,
        requered: true
    }
});

module.exports = mongoose.model('Mutant', mutantSchema);