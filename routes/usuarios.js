import express from "express";
import { verificarToken, generarToken } from "../middlewares/auth.js";
import {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} from "../controllers/usuarioController.js";

const router = express.Router();

// ==================== RUTAS PÚBLICAS ====================

// POST - Crear un nuevo usuario
router.post("/", async (req, res) => {
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
router.post("/login", (req, res) => {
    const token = generarToken("usuario123");

    res.json({
        success: true,
        message: "Token generado correctamente",
        token: token,
        expiresIn: "180s"
    });
});

// ==================== RUTAS PROTEGIDAS CON JWT ====================

// GET - Obtener todos los usuarios (requiere JWT)
router.get("/", verificarToken, async (req, res) => {
    const resultado = await obtenerUsuarios();
    res.json(resultado);
});

// GET - Obtener un usuario por ID (requiere JWT)
router.get("/:id", verificarToken, async (req, res) => {
    const resultado = await obtenerUsuarioPorId(req.params.id);
    res.json(resultado);
});

// PUT - Actualizar un usuario (requiere JWT)
router.put("/:id", verificarToken, async (req, res) => {
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
router.delete("/:id", verificarToken, async (req, res) => {
    const resultado = await eliminarUsuario(req.params.id);
    res.status(resultado.success ? 200 : 400).json(resultado);
});

export default router;
