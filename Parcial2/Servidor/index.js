const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken'); // 1. Importamos jsonwebtoken
const recursoRouter = require('./router/recursoRouter.js');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'mi_clave_secreta_super_segura'; // Clave para firmar los tokens

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

// ===== 🔑 RUTA DE LOGIN (Genera el JWT) =====
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  // Validamos unas credenciales de prueba (puedes cambiarlas)
  if (usuario === 'admin' && password === '12345') {
    const payload = { usuario: 'admin', rol: 'administrador' };
    
    // Creamos el token con vigencia de 1 hora
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    
    return res.json({
      mensaje: '¡Login exitoso!',
      token: token
    });
  }

  res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
});

// ===== 🔒 MIDDLEWARE DE AUTENTICACIÓN CON JWT REAL =====
const verificarJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // El formato estándar es "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Acceso denegado: Token no proporcionado en los Headers (Authorization: Bearer <token>)');
  }

  // Verificamos el token usando la clave secreta
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send('Acceso denegado: Token inválido o expirado');
    }
    
    req.user = user; // Guardamos los datos del usuario decodificados en la petición si los necesitas luego
    next();
  });
};

// Ruta pública
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente :D. Haz un POST a /login para obtener tu token.');
});

// Ruta de vista Pug (PROTEGIDA CON JWT)
app.get('/vista', verificarJWT, (req, res) => {
  res.render('inicio', {
    titulo: 'Servidor Express',
    subtitulo: 'Ejercicio Pug funcionando con JWT real'
  });
});

// Rutas de recurso (PROTEGIDAS CON JWT)
app.use('/recurso', verificarJWT, recursoRouter.router);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});