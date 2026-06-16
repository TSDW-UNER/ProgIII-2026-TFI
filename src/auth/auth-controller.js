import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { pool } from '../db/conexion.js'; 

const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta_super_segura_UNER"; 

export const login = async (req, res, next) => {
    const { username, pass } = req.body;

    try {
        if (!username || !pass) {
            return res.status(400).json({ estado: false, mensaje: "Usuario y contraseña requeridos." });
        }

        // se hashea la clave en SHA-256 y Base64 como se pide 
        const passHasheada = crypto.createHash('sha256').update(pass).digest('base64');

        
        const [rows] = await pool.query(
            'SELECT user_id, username, first_name, last_name, rol FROM usuarios WHERE username = ? AND pass = ? AND activo = 1', 
            [username, passHasheada]
        );

        if (rows.length === 0) {
            return res.status(401).json({ estado: false, mensaje: "Usuario o contraseña incorrectos, o cuenta inactiva." });
        }

        const usuario = rows[0];

        const payload = {
            id: usuario.user_id,
            username: usuario.username,
            rol: usuario.rol // 'admin' u 'operator'
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

        return res.status(200).json({
            estado: true,
            mensaje: "¡Login exitoso!",
            token: token
        });

    } catch (error) {
        next(error); 
    }
};
