const express = require ('express');
const halson = require ('halson'); // Importamos la libreria HATEOAS
const multer = require('multer'); // Importamos la libreria Multer para manejar archivos
const path = require('path'); // Importamos el modulo path para manejar rutas de archivos
const router = express.Router();

//  Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Asegúrar de crear esta carpeta en la raíz de tu proyecto
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET /recurso           -> lista o filtra usando query string (?nombre=...&categoria=...)
// GET /recurso/:id       -> obtiene un recurso puntual usando parámetro de ruta
router.get ('/', (req,res,next) => {
    const {nombre, categoria} = req.query; //Parametros por query string

    if (nombre || categoria) {
        return res.status(200).json({
            mensaje: 'Recurso filtrado por query string',
            filtros: {nombre : nombre || null, categoria: categoria || null }
        });
        }

        res.status (200).json ({mensaje: 'Listado de recursos', data:[] });
    });
    
    router.get ('/:id', (req,res,next) => {
        const {id} = req.params; // parametro de ruta

        res.status(200).json({
    mensaje: 'Recurso obtenido correctamente',
    id: id
  });
});

// POST /recurso  -> crea un recurso nuevo recibiendo un archivo y el body
router.post('/', upload.single('archivo'), (req, res, next) => {
  const datosRecurso = req.body;     // Datos de texto enviados en el formulario
  const archivoSubido = req.file;    // Información del archivo recibido

  res.status(201).json({
    mensaje: 'Recurso y archivo creados correctamente',
    data: datosRecurso,
    fileInfo: archivoSubido || 'No se adjuntó ningún archivo'
  });
});

// PUT /recurso/:id  -> actualiza un recurso existente
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const cambios = req.body;

  res.status(200).json({
    mensaje: `Recurso ${id} actualizado correctamente`,
    data: cambios
  });
});

// DELETE /recurso/:id -> elimina un recurso existente
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  res.status(200).json({
    mensaje: `Recurso ${id} eliminado correctamente`
  });
});

module.exports.router = router;