# Proyecto de Análisis de Métricas de Código

Este proyecto se encarga de analizar el código JavaScript para recopilar diversas métricas, como el número de clases,
métodos, variables, funciones y líneas de código.  Estructura del Proyecto: El proyecto se divide en varios módulos:  

* `metrics`: Este módulo contiene la lógica para recopilar y almacenar las métricas del código.
* `visitor`: Este módulo contiene las clases de visitantes que recorren el árbol de sintaxis abstracta (AST) del código para recopilar las métricas.
* `analyzer`: Este módulo se encarga de analizar el código y generar el AST.

## Uso: 
Para recopilar las métricas de un directorio de código, puedes usar la función collectMetrics del módulo collector.js.
Esta función devuelve un objeto con las métricas de cada archivo y las métricas totales del proyecto.  

## Métricas Recopiladas: 

Las métricas recopiladas por este proyecto son:

* classes: Número de clases en el código.
* methods: Número de métodos en el código.
* variables: Número de variables en el código.
* functions: Número de funciones en el código.
* linesOfCode: Número de líneas de código en el código.

Licencia: Este proyecto está licenciado bajo los términos de la licencia MIT.