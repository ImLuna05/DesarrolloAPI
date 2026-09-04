const express = require('express');
const recursoRouter = require('./router/recursoRouter.js');
const app = express();
const PORT = 3000;

//Middleware para poder leer JSON en el body de las peticiones (POST, PUT)

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente (si jalo) :D');
});

//Rutas del recurso (usa Router, req.params y req.query)
app.use('/recurso', recursoRouter.router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});


