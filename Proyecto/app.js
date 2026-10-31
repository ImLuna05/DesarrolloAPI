const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Servir el archivo openapi.yaml desde la carpeta docs interna
app.use('/openapi.yaml', express.static(path.join(__dirname, 'docs/openapi.yaml')));

// 2. Ruta /docs usando Stoplight Elements
app.get('/docs', (req, res) => {
    res.send(`
        <!doctype html>
        <html lang="es">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>Documentación | API REST - Luna's Barber Studio</title>
            <!-- Element CSS -->
            <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
            <!-- Element Script -->
            <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
          </head>
          <body style="height: 100vh; margin: 0; overflow: hidden;">
            <elements-api
              apiDescriptionUrl="/openapi.yaml"
              router="hash"
              layout="sidebar"
            />
          </body>
        </html>
    `);
});

// --- RUTA DEL RECURSO (GET /api/productos) ---
app.get('/api/productos', (req, res) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || apiKey !== 'mi_super_api_key_123') {
        return res.status(401).json({
            status: "error",
            codigo: 401,
            mensaje: "Acceso denegado. API Key no proporcionada o inválida."
        });
    }

    res.status(200).json({
        status: "success",
        codigo: 200,
        total: 3,
        data: [
            {
                id: 1,
                nombre: "Fussion Pomade",
                categoria: "Fijación",
                precio: 220.00,
                stock: 15
            },
            {
                id: 2,
                nombre: "Aceite Hidratante para Barba",
                categoria: "Cuidado Facial",
                precio: 180.00,
                stock: 10
            },
            {
                id: 3,
                nombre: "Shampoo de Limpieza Profunda",
                categoria: "Higiene",
                precio: 195.00,
                stock: 8
            }
        ]
    });
});

// Encender el servidor
const PORT = 3102;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/docs`);
    console.log(`Documentación con Stoplight disponible en http://localhost:${PORT}/docs`);
});