1. ¿Qué es GraphQL?
GraphQL es un lenguaje de consulta (Query Language) para APIs y un entorno de ejecución (runtime) del lado del servidor para responder a esas consultas utilizando el esquema definido para los datos. Fue desarrollado internamente por Meta (Facebook) en 2012 y liberado como proyecto de código abierto en 2015.
Características Principales:
Obtención precisa de datos: A diferencia de REST, donde los endpoints devuelven estructuras fijas (lo que puede provocar over-fetching o under-fetching), en GraphQL el cliente solicita exactamente los campos que necesita y nada más.
Un solo Endpoint: En lugar de gestionar múltiples rutas (/users, /posts, /comments), GraphQL expone habitualmente un único endpoint (por ejemplo, /graphql).
Sistema de Tipos Fuerte (Strongly Typed): Las capacidades de una API en GraphQL se definen mediante un esquema estructurado que especifica los tipos de datos disponibles y las relaciones entre ellos.
Operaciones:
Query: Para consultar y leer datos.
Mutation: Para crear, actualizar o eliminar datos.
Subscription: Para recibir actualizaciones en tiempo real mediante WebSockets.



2. ¿Qué es SDL (Schema Definition Language)?
SDL (Schema Definition Language) es la sintaxis humana y legible que utiliza GraphQL para definir la estructura de su esquema de forma independiente del lenguaje de programación utilizado en el servidor.
Puntos clave sobre SDL:
Definición de Tipos y Campos: Permite declarar objetos, campos, escalares (como String, Int, Boolean, ID) y las relaciones entre ellos.
Contrato de Interfaz: Actúa como el contrato entre el cliente y el servidor.
Modificadores de Tipo: Utiliza el signo de exclamación (!) para indicar campos obligatorios (no nulos) y corchetes ([]) para listas o arreglos.
