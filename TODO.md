# TODO

27/05/2024

- [ ] Almacenar las métricas en su propio módulo ("metricsStore")
- [ ] Definir a los visitantes:
    - ¿un visitante corresponde a un tipo de nodo? Ejemplo Clase.
    - ¿un visitante corresponde a un tipo de métrica? Ejemplo LOC.
    - ¿un visitante corresponde a un tipo de métrica y a un tipo de nodo? Ejemplo LOC de Clase.
- [ ] Definir correctamente las métricas fan-in y fan-out
    - En OOP JavaScript, fan-in es el número de funciones o métodos que llaman a un método específico,
      indicando su nivel de reutilización o dependencia. Fan-out es el número de funciones o métodos que son llamados por un
      método específico, reflejando su nivel de acoplamiento o la cantidad de dependencias que maneja.
- [ ] Diseñar correctamente la implementación de fan-in y fan-out.
    - ¿Cómo será la salida de las métricas?
    - ¿Por cada método? ¿Por cada clase? ¿Por cada archivo?
