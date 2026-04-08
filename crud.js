import express from "express";
import cors from "cors";
import { conectarDB } from "./config/db.js";
import usuariosRoutes from "./routes/usuarios.js";

const app = express();
const puerto = 3000;

// ==================== MIDDLEWARES ====================

app.use(cors());
app.use(express.json());

// ==================== CONECTAR A BASE DE DATOS ====================

await conectarDB();

// ==================== RUTAS ====================

app.use("/usuarios", usuariosRoutes);

// Ruta de login como ruta general (alternativa)
app.post("/login", (req, res) => {
    res.redirect("/usuarios/login");
});

// ==================== INICIAR SERVIDOR ====================

app.listen(puerto, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${puerto}`);
    /*console.log(`\n📝 Endpoints disponibles:\n`);
    console.log(`   Rutas PÚBLICAS (sin JWT):`);
    console.log(`   POST   /usuarios           - Crear un nuevo usuario`);
    console.log(`   POST   /usuarios/login     - Obtener token JWT\n`);
    console.log(`   Rutas PROTEGIDAS (requieren JWT):`);
    console.log(`   GET    /usuarios           - Obtener todos los usuarios`);
    console.log(`   GET    /usuarios/:id       - Obtener un usuario por ID`);
    console.log(`   PUT    /usuarios/:id       - Actualizar usuario`);
    console.log(`   DELETE /usuarios/:id       - Eliminar usuario\n`);*/
});

