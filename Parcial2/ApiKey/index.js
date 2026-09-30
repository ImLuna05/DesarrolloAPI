require('dotenv').config(); // 1. Carga las variables de entorno desde .env
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const recursoRouter = require('./router/recursoRouter.js');

const app = express();
// 2. Lee el puerto desde el .env o usa 3000 por defecto
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de terceros
app.use(cors());
app.use(morgan('dev'));

// Middleware propio (Logger)
app.use((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log('[Middleware propio] ' + fecha + ' - ' + req.method + ' ' + req.url);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== MIDDLEWARE DE AUTENTICACIÓN POR API-KEY =====
const authApiKey = (req, res, next) => {
  // Busca la clave en headers (x-api-key o authorization) o en la URL (?api_key=... o ?token=...)
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'] || req.query.api_key || req.query.token;

  // 3. Valida contra la variable de entorno process.env.API_KEY
  if (apiKey && apiKey === process.env.API_KEY) {
    return next();
  }

  return res.status(401).send('Acceso denegado: API Key inválida o no proporcionada');
};

// Ruta pública
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente :D');
});

// Ruta de vista Pug (PROTEGIDA)
app.get('/vista', authApiKey, (req, res) => {
  res.render('inicio', {
    titulo: 'Servidor Express',
    subtitulo: 'Ejercicio Pug funcionando con Autenticación'
  });
});

// Rutas de recurso (PROTEGIDAS)
app.use('/recurso', authApiKey, recursoRouter.router);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
  console.log(`API Key cargada desde .env: ${process.env.API_KEY ? 'Sí' : 'No'}`);
});