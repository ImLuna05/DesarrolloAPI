const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const recursoRouter = require('./router/recursoRouter.js');

const app = express();
const PORT = 3000;

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

// =====  MIDDLEWARE DE AUTENTICACIÓN  =====
const authSimple = (req, res, next) => {
  // Lee el token desde la URL (?token=12345) o desde los Headers
  const token = req.query.token || req.headers['authorization'];
  
  if (token === '12345') return next(); // Si es correcto, da acceso
  res.status(401).send('Acceso denegado: Requiere token válido (?token=12345)');
};

// Ruta pública
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente :D');
});

// Ruta de vista Pug (PROTEGIDA)
app.get('/vista', authSimple, (req, res) => {
  res.render('inicio', {
    titulo: 'Servidor Express',
    subtitulo: 'Ejercicio Pug funcionando con Autenticación'
  });
});

// Rutas de recurso (PROTEGIDAS)
app.use('/recurso', authSimple, recursoRouter.router);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});