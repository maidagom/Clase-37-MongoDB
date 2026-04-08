import mongoose from "mongoose";

const URL = "mongodb://localhost:27017/personas";

await mongoose.connect(URL);

// ==================== ESQUEMA Y MODELO ====================

const esquemaUsuario = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        edad: {
            type: Number,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const modelUsuario = mongoose.model("User", esquemaUsuario);

// ==================== FUNCIONES CRUD ====================

// CREATE - Crear un nuevo usuario
export const crearUsuario = async (nombre, apellido, email, edad) => {
    try {
        const nuevoUsuario = new modelUsuario({
            nombre,
            apellido,
            email,
            edad
        });
        const resultado = await nuevoUsuario.save();
        return { success: true, data: resultado };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// READ - Obtener todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const usuarios = await modelUsuario.find();
        return { success: true, data: usuarios };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// READ - Obtener un usuario por ID
export const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await modelUsuario.findById(id);
        if (!usuario) {
            return { success: false, error: "Usuario no encontrado" };
        }
        return { success: true, data: usuario };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// UPDATE - Actualizar un usuario (requiere JWT)
export const actualizarUsuario = async (id, datos) => {
    try {
        const usuario = await modelUsuario.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );
        if (!usuario) {
            return { success: false, error: "Usuario no encontrado" };
        }
        return { success: true, data: usuario, message: "Usuario actualizado correctamente" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// DELETE - Eliminar un usuario (requiere JWT)
export const eliminarUsuario = async (id) => {
    try {
        const usuario = await modelUsuario.findByIdAndDelete(id);
        if (!usuario) {
            return { success: false, error: "Usuario no encontrado" };
        }
        return { success: true, data: usuario, message: "Usuario eliminado correctamente" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};