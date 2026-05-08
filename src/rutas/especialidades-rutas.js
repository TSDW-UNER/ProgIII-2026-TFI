import express from 'express';

import EspecialidadesControlador from "../controladores/especialidades-controlador.js";

const router = express.Router();

const especialidadesControlador = new EspecialidadesControlador();
//Buscar todas
router.get('/', especialidadesControlador.buscarTodas);
//Buscar por id
router.get('/:id_especialidad', especialidadesControlador.buscarPorId);
// //Modificar especialidad
router.put('/:id_especialidad', especialidadesControlador.modificarPorId);
// //Agregar especialidad
router.post('/', especialidadesControlador.crear);
//Borrar por id
router.delete('/:id_especialidad', especialidadesControlador.eliminarPorId);
// //Restaurar por id
// router.put('/borradas/:id_especialidad', especialidadesControlador);

export {router};