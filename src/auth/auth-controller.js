import jwt from 'jsonwebtoken';
import { pool } from '../db/conexion.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({
                estado: false,
                mensaje: "Email y contraseña requeridos"
            });
        }

        const [rows] = await pool.query(
            `
            SELECT *
            FROM usuarios
            WHERE email = ?
            AND contrasenia = SHA2(?,256)
            AND activo = 1
            `,
            [email, password]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                estado: false,
                mensaje: "Credenciales inválidas"
            });
        }

        const usuario = rows[0];

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                rol: usuario.rol,
                email: usuario.email
            },
            JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.status(200).json({
            estado: true,
            token
        });

    } catch (error) {
        next(error);
    }
};