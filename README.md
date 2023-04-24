
# Ficohsa Challenge

Ficosha Challenge, es una API creada para mostrar mostrar lsa capacidades de desarrollo backend en Nodejs como requisito para la postulación al cargo de desarrollo backend en Ficosha.
Este proyecto revisa si la sequencia de ADN de un humano cumple los requisitos para ser un mutante.

## Dev Stack

**Server:** Nodejs v16, Express, Mongo DB

**Cloud:** Azure App Services, CI/CD 


## URL API

https://challenge-bryan-garcia.azurewebsites.net/


## Clonacion y Ejecucion

Clonar proyecto

```bash
  git clone https://github.com/BryanGarciaG/challengeFicosha.git
```

Acceder al repositorio local.

```bash
  cd ../challengeFicosha
```

Instalar dependencias

```bash
  npm install
```

Ejecutar  servidor

```bash
  node src/app.js
```


## Ejecucion de test

Para ejecutar las pruebas se utilizan los modulos JEST y SUPERTEST.
Ejecutar el comando para ejecutar las pruebas y conocer la cobertura
```bash
npm test
```
## Documentacion de las APIs

#### Check Mutant

```http
  POST /mutant
```
Evalua si el array de entrada corresponde a una sequencia de ADN valida, si no es asi retona el mensaje 'The provided DNA isnt valid'. Si la cadena de ADN es mutante retorna status 200 OK, caso contrario 403 Forbidden
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `dna` | `string[]` | **Required**. Cadena de ADN que se evaluara para conocer si es mutante. |

#### Estadisticas de revision

```http
  GET /api/stats/
```
Devuelve un objeto con la cantidad de humanos evaluados, cuantos son mutantes y el ratio.


## Liceciamiento

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

