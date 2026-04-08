import jwt from "jsonwebtoken";

const secretKey = "miclave123";

// ==================== MIDDLEWARE DE VERIFICACIÓN JWT ====================

export const listadoVerificados = ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc3NTYxNDU0NTkxOSwiaWF0IjoxNzc1NjE0NTQ1OTE5LCJleHAiOjE3NzU2MTQ1NDYwOTl9._XExRpqe_tfKiDqui9t5juySn08oz-V-mkco6gYpRIM"];

export const verificarToken = (req, res, next) => {
    console.log("🔍 Middleware verificarToken ejecutado");
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        console.log("❌ No hay header Authorization");
        return res.status(401).json({
            success: false,
            error: "Token requerido. Envía: Authorization: Bearer {token}"
        });
    }

    const unixsegundos = Math.floor(new Date().getTime() / 1000);

    const token = authHeader.replace("Bearer ", "");
    console.log("Token recibido:", token.substring(0, 20) + "...");

    jwt.verify(token, secretKey, (error, decodificado) => {
        if (error) {
            console.log("❌ Token inválido:", error.message);
            return res.status(403).json({
                success: false,
                error: "Token inválido o expirado",
                detalles: error.message,
                extra: listadoVerificados.includes(token) ? jwt.sign({ id:"usuario123" },secretKey,{ expiresIn: "180s" }) : ""
            });
        }
        console.log("✅ Token válido");
        req.usuario = decodificado;
        const diferencia = decodificado.exp - unixsegundos;
        if ( diferencia >= 5 && diferencia <= 120 ) {
            listadoVerificados.push(token);
        }
        next();
    });
};

// ==================== FUNCIÓN PARA GENERAR TOKEN ====================

export const generarToken = () => {
    return jwt.sign(
        { id: Date.now(), iat: Date.now() },
        secretKey,
        { expiresIn: "180s" }
    );
};
