const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const recursoRouter = require('./router/recursoRouter.js');

const app = express();
const PORT = 3000;

//Middleware de terceros
app.use(cors());           // Permite peticiones desde otros dominios/origenes
app.use(morgan('dev'));   // Registra en consola cada petición (método, ruta, status, tiempo)

// ===== MIDDLEWARE DE APLICACIÓN (propio) =====
// Función personalizada que se ejecuta antes de llegar a las rutas

app.use((req,res,next) => {
  const fecha = new Date().toISOString();
  console.log('[Middleware propio] ' + fecha + ' - ' + req.method + ' ' + req.url);
  next();
});

//Middleware para poder leer JSON en el body de las peticiones (POST, PUT)

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Ruta principal
app.get('/' , (req, res) => {
  res.send('Servidor Express funcionando correctamente (si jalo) :D');
});

//Rutas del recurso (usa Router, req.params y req.query)
app.use('/recurso', recursoRouter.router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});


