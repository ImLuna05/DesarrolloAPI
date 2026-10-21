const express = require('express');
const https = require('https'); // 1. Módulo nativo para HTTPS y peticiones
const fs = require('fs');       // 2. Módulo nativo para leer archivos (certificados)
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');   // Módulo de node para construir rutas de archivos/carpetas
const recursoRouter = require('./router/recursoRouter.js');

// ===== CONFIGURACIÓN DE OPCIONES HTTPS =====
// 3. Carga de clave privada y certificado desde la carpeta 'ssl'
const opciones = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl/cert.pem'))
};

const app = express();
const PORT = 3000;

app.set('view engine', 'pug'); // Indica a express que use pug para renderizar las vistas con res.render()
app.set('views', path.join(__dirname, 'views')); // Indica en qué carpeta buscar los archivos .pug (carpeta "views")

// Middlewares de terceros
app.use(cors());          // Permite peticiones desde otros dominios/orígenes
app.use(morgan('dev'));   // Registra en consola cada petición (método, ruta, status, tiempo)

// ===== MIDDLEWARE DE APLICACIÓN (propio) =====
// Función personalizada que se ejecuta antes de llegar a las rutas
app.use((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log('[Middleware propio] ' + fecha + ' - ' + req.method + ' ' + req.url);
  next();
});

// Middleware para poder leer JSON en el body de las peticiones (POST, PUT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente sobre HTTPS :D');
});

// Ruta de ejemplo que renderiza una vista con Pug
app.get('/vista', (req, res, next) => {
  res.render('inicio', {                      // Renderiza views/inicio.pug y le envía un objeto con datos
    titulo: ' Servidor Express',              // Variable "titulo" disponible en la plantilla como #{titulo}
    subtitulo: 'Ejercicio Pug funcionando'    // Variable "subtitulo" disponible en la plantilla como #{subtitulo}
  });
});

// Rutas del recurso (usa Router, req.params y req.query)
app.use('/recurso', recursoRouter.router);

// ===== RUTA GRAPHQL: CONSUMO DE API RICK AND MORTY =====
app.get('/rick-and-morty', (req, res) => {
  // Construcción del cuerpo de la petición GraphQL
  const queryData = JSON.stringify({
    query: `
      {
        characters(page: 1, filter: { name: "rick" }) {
          info {
            count
          }
          results {
            name
            species
            status
          }
        }
      }
    `
  });

  // Opciones de conexión hacia el servidor público de GraphQL
  const options = {
    hostname: 'rickandmortyapi.com',
    path: '/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(queryData)
    }
  };

  // Petición HTTPS nativa
  const externalReq = https.request(options, (externalRes) => {
    let data = '';

    externalRes.on('data', (chunk) => {
      data += chunk;
    });

    externalRes.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.json({
          mensaje: "Consulta GraphQL realizada con éxito a Rick and Morty desde el servidor HTTPS",
          resultado: parsedData
        });
      } catch (e) {
        res.status(500).json({ error: "Error al procesar la respuesta JSON de la API de GraphQL." });
      }
    });
  });

  externalReq.on('error', (error) => {
    console.error("Error en la petición GraphQL:", error);
    res.status(500).json({ error: "Error al conectar con la API pública de Rick and Morty." });
  });

  // Envío del cuerpo de la consulta y cierre de la conexión
  externalReq.write(queryData);
  externalReq.end();
});

// ===== INICIAR EL SERVIDOR SEGURO =====
// 4. Se reemplaza app.listen por https.createServer(opciones, app).listen
https.createServer(opciones, app).listen(PORT, () => {
  console.log(`Servidor Express Seguro en puerto ${PORT}`);
  console.log(`Accede en: https://localhost:${PORT}`);
  console.log(`Prueba GraphQL en: https://localhost:${PORT}/rick-and-morty`);
});