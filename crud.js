import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} from "./personas.js";

const app = express();
const puerto = 3000;
const secretKey = "miclave123";

// ==================== MIDDLEWARES ====================

app.use(cors());
app.use(express.json());

// ==================== MIDDLEWARE DE VERIFICACIÓN JWT ====================

const verificarToken = (req, res, next) => {
    console.log("🔍 Middleware verificarToken ejecutado");
    console.log("Headers recibidos:", req.headers);
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        console.log("❌ No hay header Authorization");
        return res.status(401).json({
            success: false,
            error: "Token requerido. Envía: Authorization: Bearer {token}"
        });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Token recibido:", token.substring(0, 20) + "...");

    jwt.verify(token, secretKey, (error, decodificado) => {
        if (error) {
            console.log("❌ Token inválido:", error.message);
            return res.status(403).json({
                success: false,
                error: "Token inválido o expirado",
                detalles: error.message
            });
        }
        console.log("✅ Token válido");
        req.usuario = decodificado;
        next();
    });
};

// ==================== RUTAS PÚBLICAS ====================

// POST - Crear un nuevo usuario
app.post("/usuarios", async (req, res) => {
    const { nombre, apellido, email, edad } = req.body;

    if (!nombre || !apellido || !email) {
        return res.status(400).json({
            success: false,
            error: "Los campos nombre, apellido y email son obligatorios"
        });
    }

    const resultado = await crearUsuario(nombre, apellido, email, edad);
    res.status(resultado.success ? 201 : 400).json(resultado);
});

// POST - Obtener token JWT
app.post("/login", (req, res) => {
    const token = jwt.sign(
        { id: Date.now(), iat: Date.now() },
        secretKey,
        { expiresIn: "1h" }
    );

    res.json({
        success: true,
        message: "Token generado correctamente",
        token: token,
        expiresIn: "1h"
    });
});

// ==================== RUTAS PROTEGIDAS CON JWT ====================

// GET - Obtener todos los usuarios (requiere JWT)
app.get("/usuarios", verificarToken, async (req, res) => {
    const resultado = await obtenerUsuarios();
    res.json(resultado);
});

// GET - Obtener un usuario por ID (requiere JWT)
app.get("/usuarios/:id", verificarToken, async (req, res) => {
    const resultado = await obtenerUsuarioPorId(req.params.id);
    res.json(resultado);
});

// PUT - Actualizar un usuario (requiere JWT)
app.put("/usuarios/:id", verificarToken, async (req, res) => {
    const { nombre, apellido, email, edad } = req.body;

    // Construir objeto con solo los campos proporcionados
    const datosActualizar = {};
    if (nombre) datosActualizar.nombre = nombre;
    if (apellido) datosActualizar.apellido = apellido;
    if (email) datosActualizar.email = email;
    if (edad !== undefined) datosActualizar.edad = edad;

    if (Object.keys(datosActualizar).length === 0) {
        return res.status(400).json({
            success: false,
            error: "Debe proporcionar al menos un campo para actualizar"
        });
    }

    const resultado = await actualizarUsuario(req.params.id, datosActualizar);
    res.status(resultado.success ? 200 : 400).json(resultado);
});

// DELETE - Eliminar un usuario (requiere JWT)
app.delete("/usuarios/:id", verificarToken, async (req, res) => {
    const resultado = await eliminarUsuario(req.params.id);
    res.status(resultado.success ? 200 : 400).json(resultado);
});

// ==================== INICIAR SERVIDOR ====================

app.listen(puerto, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${puerto}`);
    /*console.log(`\n📝 Endpoints disponibles:\n`);
    console.log(`   Rutas PÚBLICAS (sin JWT):`);
    console.log(`   POST   /usuarios           - Crear un nuevo usuario`);
    console.log(`   POST   /login              - Obtener token JWT\n`);
    console.log(`   Rutas PROTEGIDAS (requieren JWT):`);
    console.log(`   GET    /usuarios           - Obtener todos los usuarios`);
    console.log(`   GET    /usuarios/:id       - Obtener un usuario por ID`);
    console.log(`   PUT    /usuarios/:id       - Actualizar usuario`);
    console.log(`   DELETE /usuarios/:id       - Eliminar usuario\n`);*/
});

