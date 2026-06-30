import jwt from 'jsonwebtoken';

process.loadEnvFile();

// se valida si el token existe y es real
export const esAutenticado = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ estado: false, mensaje: "Acceso denegado. Se requiere token." });
    }

    jwt.verify(token, process.env.JWT_SECRET , (err, usuarioDecodificado) => {
        if (err) {
            return res.status(403).json({ estado: false, mensaje: "Token inválido o expirado." });
        }
        req.user = usuarioDecodificado; 
        next(); 
    });
};

// aca se valida si el rol tiene permiso
export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ estado: false, mensaje: "Acceso denegado. Permisos insuficientes." });
        }
        next();
    };
};
