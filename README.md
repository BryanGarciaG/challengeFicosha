
# Ficohsa Challenge

Ficosha Challenge, es una API creada para mostrar mostrar lsa capacidades de desarrollo backend en Nodejs como requisito para la postulación al cargo de desarrollo backend en Ficohsa.
Este proyecto revisa si la secuencia de ADN de un humano cumple los requisitos para ser un mutante.

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
Evalua si el array de entrada corresponde a una secuencia de ADN valida, si no es asi retona el mensaje 'The provided DNA isnt valid'. Si la cadena de ADN es mutante retorna status 200 OK, caso contrario 403 Forbidden
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `dna` | `string[]` | **Required**. Cadena de ADN que se evaluara para conocer si es mutante. |

##### Criterios de aceptación

    ■ El parametro de entrada debe ser un array de Strings con la secuencia de ADN
    ■ El Array debe ser de N*N, donde el valor de N debe ser igual para filas y para columnas para formar una matriz
    ■ La matriz debe contener unicamente los caracteres A, T, C, G
    ■ Se considera que una secuencia de ADN es mutante si en la matriz se encuentra mas de una secuencia de cutro letra iguales de forma oblicua, horizontal o vertical
    ■ Si la cadena de ADN es mutante retorna status 200 OK
    ■ Si la cadena de ADN es no mutante retorna status 403 Forbidden

#### Estadisticas de revision

```http
  GET /api/stats/
```
Devuelve un objeto con la cantidad de humanos evaluados, cuantos son mutantes y el ratio.

##### Criterios de aceptación

    ■ El objeto devuelto debe de contener 3 propiedades count_mutant_dna, count_human_dna y ratio
    ■ La propiedad count_mutant_dna corresponde a la cantidad de ADN que son mutantes
    ■ La propiedad count_human_dna corresponde a la cantidad de ADN que son humanos
    ■ La propiedad ratio corresponde a la relacion entre humanos y mutantes



## Liceciamiento

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

