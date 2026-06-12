import { pool } from "./conexion.js";

export default class Medicos {

    /*
    |--------------------------------------------------------------------------
    | BUSCAR TODOS
    |--------------------------------------------------------------------------
    */
    buscarTodos = async () => {
        const sql = `
            SELECT id_medico, matricula, valor_consulta, id_usuario, id_especialidad
            FROM medicos
        `;
        const [medicos] = await pool.query(sql);
        return medicos;
    }

    /*
    |--------------------------------------------------------------------------
    | BUSCAR POR ID
    |--------------------------------------------------------------------------
    */
    buscarPorId = async (id) => {
        const sql = `
            SELECT id_medico, matricula, valor_consulta, id_usuario, id_especialidad
            FROM medicos
            WHERE id_medico = ?
        `;
        const [medicos] = await pool.execute(sql, [id]);
        
        if (medicos.length === 0) return null;
        return medicos[0];
    }

    /*
    |--------------------------------------------------------------------------
    | CREAR MÉDICO
    |--------------------------------------------------------------------------
    */
    crear = async (datos) => {
        const { matricula, valor_consulta, id_usuario, id_especialidad } = datos;
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            // Incluimos id_especialidad en el INSERT para satisfacer la FK
            const sql = `
                INSERT INTO medicos (matricula, valor_consulta, id_usuario, id_especialidad)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await conexion.execute(sql, [matricula, valor_consulta, id_usuario, id_especialidad]);

            await conexion.commit();
            return result.insertId;

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | MODIFICAR POR ID
    |--------------------------------------------------------------------------
    */
    modificarPorId = async (id, datos) => {
        const { matricula, valor_consulta, id_usuario, id_especialidad } = datos;
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sqlUpdate = `
                UPDATE medicos
                SET matricula = ?, valor_consulta = ?, id_usuario = ?, id_especialidad = ?
                WHERE id_medico = ?
            `;
            const [result] = await conexion.execute(sqlUpdate, [matricula, valor_consulta, id_usuario, id_especialidad, id]);

            if (result.affectedRows === 0) {
                await conexion.rollback();
                return false;
            }

            await conexion.commit();
            return true;

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | ELIMINAR FÍSICO
    |--------------------------------------------------------------------------
    */
    eliminarPorId = async (id) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sqlDelete = `
                DELETE FROM medicos 
                WHERE id_medico = ?
            `;
            const [result] = await conexion.execute(sqlDelete, [id]);

            if (result.affectedRows === 0) {
                await conexion.rollback();
                return null;
            }

            await conexion.commit();
            return result;

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }
}