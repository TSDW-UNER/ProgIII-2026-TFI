import { pool } from "./conexion.js";

export default class Especialidades {
    buscarTodas = async () => {
        
        const sql = "SELECT * FROM especialidades WHERE activo = 1";
        const [especialidades] = await pool.query(sql);
        return especialidades;
    }

    buscarPorId = async (id) => {
        const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;
        const [especialidades] = await pool.execute(sql, [id]);
        return especialidades;
    }

    modificarPorId = async(id, nombre) => {

        const sqlCheck = `SELECT id_especialidad FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;
        const [especialidades] = await pool.execute(sqlCheck, [id]);

        if (especialidades.length === 0) {
            return false;
        }
        
        const sqlUpdate = "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?";
        const [result] = await pool.execute(sqlUpdate, [nombre, id]);
        return result;
        }

    eliminarPorId = async (id) => {
        const sqlCheck = "SELECT id_especialidad FROM especialidades WHERE activo = 1 AND id_especialidad = ?";
        const [rows] = await pool.execute(sqlCheck, [id]);

        if (rows.length === 0) return null;

        // Ejecutamos el borrado lógico (UPDATE activo = 0)
        const sqlDelete = "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?";
        const [result] = await pool.execute(sqlDelete, [id]);
        return result;
    }

    crear = async (nombre) => {
    const sql = "INSERT INTO especialidades (nombre) VALUES (?)";
    const [result] = await pool.execute(sql, [nombre]);
    
    return result.insertId;
}
}