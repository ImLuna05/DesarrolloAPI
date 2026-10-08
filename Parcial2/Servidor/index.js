const express = require('express');
const https = require('https'); // 1. Módulo nativo para HTTPS
const fs = require('fs');       // 2. Módulo nativo para leer archivos (certificados)
const morgan = require('morgan');
const cors = require('cors');
const path = require('path'); // modulo de node para construir rutas de archivos/carpetas
const recursoRouter = require('./router/recursoRouter.js');

// ===== CONFIGURACIÓN DE OPCIONES HTTPS =====
// 3. Carga de clave privada y certificado desde la carpeta 'ssl'
const opciones = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl/cert.pem'))
};

const app = express();
const PORT = 3000;

app.set('view engine', 'pug'); // indica a express que use pug para renderizar las vistas con res.render()
app.set('views', path.join(__dirname, 'views')); // indica en qué carpeta buscar los archivos .pug (carpeta "views")

// Middleware de terceros
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

// ===== INICIAR EL SERVIDOR SEGURO =====
// 4. Se reemplaza app.listen por https.createServer(opciones, app).listen
https.createServer(opciones, app).listen(PORT, () => {
  console.log(`Servidor Express Seguro en puerto ${PORT}`);
  console.log(`Accede en: https://localhost:${PORT}`);
});