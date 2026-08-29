# Parcial 1: Definiciones de Conceptos Web

---

## 1. ¿Qué es una API?

**API** son las siglas de **Application Programming Interface** (*Interfaz de Programación de Aplicaciones*).

Es un conjunto de reglas, protocolos y especificaciones que permite que dos aplicaciones de software se comuniquen entre sí e intercambien datos de forma segura. Funciona como un intermediario que abstrae la complejidad interna del sistema, permitiendo consumir servicios sin necesidad de conocer su implementación interna.

* **Ejemplo analógico:** Actúa como el mesero en un restaurante: el cliente (aplicación) pide un platillo del menú, el mesero lleva la orden a la cocina (servidor) y regresa con la respuesta sin que el cliente tenga que entrar a la cocina a prepararlo.

---

## 2. ¿Qué es REST?

**REST** significa **Representational State Transfer** (*Transferencia de Estado Representacional*). Es un estilo de arquitectura de software diseñado por Roy Fielding en el año 2000 para la creación de sistemas distribuidos e hipermedia en la web.

REST define un conjunto de principios y restricciones de diseño para lograr servicios ligeros y escalables:

1. **Arquitectura Cliente-Servidor:** Separación estricta de responsabilidades entre la interfaz de usuario y la lógica/almacenamiento de datos.
2. **Sin Estado (Stateless):** Cada petición del cliente al servidor debe incluir toda la información necesaria para procesarse. El servidor no almacena sesiones del cliente entre solicitudes.
3. **Caché (Cacheable):** Las respuestas deben explicitar si pueden ser guardadas en caché para optimizar el rendimiento y reducir latencia.
4. **Interfaz Uniforme:** Estandarización de la forma en que los clientes interactúan con el servidor mediante recursos y URIs.
5. **Sistema en Capas (Layered System):** La arquitectura permite intermediarios (proxies, balanceadores de carga) sin que el cliente note la diferencia.

---

## 3. ¿A qué se refiere el término RESTful?

El término **RESTful** se utiliza para describir a cualquier servicio web o API que **cumple e implementa formalmente los principios y restricciones de la arquitectura REST**.

Una **API RESTful** destaca por las siguientes características técnicas:

* **Orientada a Recursos:** Los datos u objetos se identifican de manera única mediante URIs (ejemplo: `https://api.ejemplo.com/v1/usuarios`).
* **Verbos HTTP Estandarizados:** Emplea los métodos HTTP de forma semántica para operaciones CRUD:
  * `GET`: Consultar o recuperar recursos.
  * `POST`: Crear un nuevo recurso.
  * `PUT` / `PATCH`: Actualizar un recurso existente.
  * `DELETE`: Eliminar un recurso.
* **Formato de Datos:** Intercambia información comúnmente en formato **JSON** o **XML**.
* **Respuestas con Códigos de Estado HTTP:** Informa el resultado mediante códigos estándar (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
