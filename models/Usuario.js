import mongoose from "mongoose";
import { Interface } from "node:readline";

// ==================== ESQUEMA ====================

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
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

// ==================== MODELO ====================

export const Usuario = mongoose.model("User", esquemaUsuario);
