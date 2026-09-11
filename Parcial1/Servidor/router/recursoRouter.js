const express = require ('express');
const router = express.Router();

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

// POST /recurso   -> crea un recurso nuevo con el body de la petición
router.post('/', (req, res, next) => {
  const nuevoRecurso = req.body;

  res.status(201).json({
    mensaje: 'Recurso creado correctamente',
    data: nuevoRecurso
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