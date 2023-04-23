const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require("swagger-ui-express");
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");




/**
 * referecia a las rutas
 */
const mutantRouter = require('./routes/mutant.routes');

const swagger = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Challenge Ficohsa",
            version: "1.0.0"
        }
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

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
        this.routes();
        this.database();
    }

    middlewares() {
        this.app.use('/', mutantRouter);
        this.app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swagger)));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }

    routes() {
        this.app.get('*', function(req, res) {
            res.redirect('/documentation');
        });
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