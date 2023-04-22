const mongoose = require('mongoose');
const express = require('express');

/**
 * referecia a las rutas
 */
const mutantRouter = require('./../src/routes/mutant.routes');

/**
 * Clase inicial del servidor
 */
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.middlewares();
        this.database();
    }

    middlewares() {
        this.app.use('/', mutantRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }

    database() {
        mongoose.connect(process.env.MONGOURL)
            .then(() => {
                console.log("Connected to Mongo");
            })
            .catch(error => {
                console.log(error);
            })
    }
}


module.exports = Server;