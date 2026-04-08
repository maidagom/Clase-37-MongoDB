import mongoose from "mongoose";

const URL = "mongodb://localhost:27017/personas";

export const conectarDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
        process.exit(1);
    }
};
