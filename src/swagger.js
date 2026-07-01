import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
definition: {
openapi: "3.0.0",
info: {
title: "API Gestor de Turnos",
version: "1.0.0",
description: "Documentación API del Trabajo Final Integrador"
},
servers: [
{
url: "http://localhost:3000"
}
]
},
apis: ["./src/rutas/v1/*.js"]
};

const specs = swaggerJsdoc(options);

export {
swaggerUi,
specs
};
