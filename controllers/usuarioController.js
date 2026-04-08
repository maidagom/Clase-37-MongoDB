import { Usuario } from "../models/Usuario.js";

// ==================== CONTROLADOR CRUD ====================

// CREATE - Crear un nuevo usuario
export const crearUsuario = async (nombre, apellido, email, edad) => {
    try {
        const nuevoUsuario = new Usuario({
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
        const usuarios = await Usuario.find();
        return { success: true, data: usuarios };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// READ - Obtener un usuario por ID
export const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return { success: false, error: "Usuario no encontrado" };
        }
        return { success: true, data: usuario };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// UPDATE - Actualizar un usuario
export const actualizarUsuario = async (id, datos) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
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

// DELETE - Eliminar un usuario
export const eliminarUsuario = async (id) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return { success: false, error: "Usuario no encontrado" };
        }
        return { success: true, data: usuario, message: "Usuario eliminado correctamente" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
