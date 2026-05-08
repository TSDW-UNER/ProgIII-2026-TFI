import express from "express";
import { pool } from "./db/conexion.js"
import { testConexion } from "./db/test-conexion.js"
import { check, param } from "express-validator";
import { validarCampos } from "./middlewares/validar-campos.js";
import { router as v1EspecialidadesRutas } from "./rutas/especialidades-rutas.js";

const app = express();

await testConexion();

app.use(express.json());

app.get('/', (req,res) => {
    console.log('test get');
    res.status(200).send({'estado': 'ok', 'mensaje': 'API ok'}); 
});

app.use('/api/v1/especialidades', v1EspecialidadesRutas);

// app.post('/especialidades', [check('nombre', 'El nombre es obligatorio').notEmpty(), validarCampos],async (req,res) => {
//     try {
//         const { nombre } = req.body;

//         const sql = "INSERT INTO especialidades (nombre) VALUES (?)";

//         const [result] = await pool.execute(sql, [nombre]);

//         console.log(result);
//         if (result.affectedRows > 0){
//             res.status(201).send({'estado': 'ok', 'mensaje': `Especialidad creada con id: ${result.insertId}`});         
//         }

//     } catch(error){
//          res.status(500).send({'estado': false, 'mensaje': 'Error interno'});
//     }
// });

// app.put('/especialidades/:id_especialidad', 
//     [
//         check('nombre')
//             .notEmpty().withMessage('El nombre es obligatorio')
//             .isLength({max:120}).withMessage('El nombre no puede tener mas de 120 caracteres'),
//         param("id_especialidad", "Ingrese un parametro valido").isInt(),
//         validarCampos
//     ],
//     async (req,res) => {
//     try {
//         const id_especialidad = req.params.id_especialidad;

//         const sql1 = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

//         const [especialidades, fields] = await pool.execute(sql1, [id_especialidad]);
        
//         if (especialidades.length == 0){
//             res.status(404).send({'estado': false, 'mensaje': `Especialidad no encontrada`});         
//         }

//         const { nombre } = req.body;

//         const sql = "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?";

//         const [result] = await pool.execute(sql, [nombre, id_especialidad]);

//         if (result.affectedRows > 0){
//             res.status(200).send({'estado': true, 'mensaje': `Especialidad actualizada`});         
//         }

//     } catch(error){
//          res.status(500).send({'estado': false, 'mensaje': 'Error interno'});
//     }
// });

// app.put('/especialidades/borradas/:id_especialidad', 
//     [
//         param("id_especialidad", "Ingrese un parametro valido").isInt(),
//         validarCampos
//     ],
//     async (req,res) => {
//     try {
//         const id_especialidad = req.params.id_especialidad;

//         const sql1 = `SELECT * FROM especialidades WHERE activo = 0 AND id_especialidad = ?`;

//         const [especialidades, fields] = await pool.execute(sql1, [id_especialidad]);
        
//         if (especialidades.length == 0){
//             res.status(404).send({'estado': false, 'mensaje': `Especialidad no encontrada`});         
//         }

//         const sql = "UPDATE especialidades SET activo = 1 WHERE id_especialidad = ?";

//         const [result] = await pool.execute(sql, [id_especialidad]);

//         if (result.affectedRows > 0){
//             res.status(200).send({'estado': true, 'mensaje': `Especialidad restaurada`});         
//         }

//     } catch(error){
//          res.status(500).send({'estado': false, 'mensaje': 'Error interno'});
//     }
// });

// app.delete('/especialidades/:id_especialidad', 
//     [
//         param("id_especialidad", "Ingrese un parametro valido").isInt(),
//         validarCampos
//     ],
//     async (req,res) => {
//     try {
//         const id_especialidad = req.params.id_especialidad;

//         const sql1 = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

//         const [especialidades, fields] = await pool.execute(sql1, [id_especialidad]);
        
//         if (especialidades.length == 0){
//             res.status(404).send({'estado': false, 'mensaje': `Especialidad no encontrada`});         
//         }


//         const sql = "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?";

//         const [result] = await pool.execute(sql, [id_especialidad]);

//         if (result.affectedRows > 0){
//             res.status(200).send({'estado': true, 'mensaje': `Especialidad eliminada`});         
//         }

//     } catch(error){
//          res.status(500).send({'estado': false, 'mensaje': 'Error interno'});
//     }
// });


// app.get('/especialidades/:id_especialidad', async (req,res) => {
//     try {
//         const id_especialidades = req.params.id_especialidad;

//         const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

//         const [especialidades, fields] = await pool.execute(sql, [id_especialidades]);
        
//         res.status(200).send(
//             {'estado': 'ok', 
//              'especialidades': especialidades});
//     }
//     catch(error) {
//         console.log(error);
//     }
// });

process.loadEnvFile();
const PUERTO = process.env.PUERTO

app.listen(PUERTO || 3000, () => {
    console.log(`servidor iniciado en puerto ${PUERTO}`);
});


