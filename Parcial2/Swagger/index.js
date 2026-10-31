const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc'); // 1. Importamos swagger-jsdoc
const swaggerUi = require('swagger-ui-express'); // 2. Importamos swagger-ui-express
const recursoRouter = require('./router/recursoRouter.js');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de terceros
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware propio (Logger)
app.use((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log('[Middleware propio] ' + fecha + ' - ' + req.method + ' ' + req.url);
  next();
});

// ===== CONFIGURACIÓN DE SWAGGER =====
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api Rest',
            version: '1.0.0',
            description: 'Documentación de la API',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: [], // Vacío tal como indica la instrucción de la tarea (aún no se documentan rutas)
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Ruta que entrega la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// ===================================

// Ruta pública
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente :D. Visita /api-docs para ver la documentación de Swagger.');
});

// Ruta de vista Pug
app.get('/vista', (req, res) => {
  res.render('inicio', {
    titulo: 'Servidor Express',
    subtitulo: 'Ejercicio Pug funcionando correctamente'
  });
});

// Rutas de recurso
app.use('/recurso', recursoRouter.router);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
  console.log(`Documentación de Swagger disponible en http://localhost:${PORT}/api-docs`);
});