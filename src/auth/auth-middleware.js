import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta_super_segura_UNER"; 


export const esAutenticado = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ estado: false, mensaje: "Acceso denegado. Se requiere token." });
    }

    jwt.verify(token, JWT_SECRET, (err, usuarioDecodificado) => {
        if (err) {
            return res.status(403).json({ estado: false, mensaje: "Token inválido o expirado." });
        }
        req.user = usuarioDecodificado; 
        next(); 
    });
};


export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const usuario = req.user;
        const rolUsuario = usuario?.rol || usuario?.user?.rol;

        if (!usuario || !rolesPermitidos.includes(rolUsuario)) {
            return res.status(403).json({ estado: false, mensaje: "Acceso denegado. Permisos insuficientes." });
        }
        next();
    };
};
