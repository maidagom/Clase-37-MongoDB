# Clase 37 - MongoDB, Express y JWT

Este proyecto es una API REST sencilla construida con Node.js, Express y MongoDB (Mongoose) que permite gestionar usuarios con autenticación basada en JSON Web Tokens (JWT).

## 🚀 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ODM para modelado de objetos de MongoDB.
- **jsonwebtoken (JWT)**: Para la autenticación y seguridad de las rutas.
- **CORS**: Middleware para permitir solicitudes de recursos cruzados.

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) instalado y ejecutándose localmente.

## 🛠️ Instalación

1. Clona este repositorio o descarga los archivos.
2. Navega a la carpeta del proyecto:
   ```bash
   cd Clase-37
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## 🏃 Ejecución

Para iniciar el servidor, ejecuta:

```bash
npm start
```

O directamente con Node:

```bash
node crud.js
```

El servidor se iniciará en `http://localhost:3000`.

## 🛣️ Endpoints de la API

### Rutas Públicas

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/usuarios` | Crea un nuevo usuario. Requiere `nombre`, `apellido`, `email` y `edad` en el cuerpo. |
| `POST` | `/usuarios/login` | Genera un token JWT para acceder a las rutas protegidas. |

### Rutas Protegidas (Requieren Header `Authorization: <token>`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/usuarios` | Obtiene la lista de todos los usuarios. |
| `GET` | `/usuarios/:id` | Obtiene los detalles de un usuario específico por su ID. |
| `PUT` | `/usuarios/:id` | Actualiza los datos de un usuario existente. |
| `DELETE` | `/usuarios/:id` | Elimina un usuario de la base de datos. |

## 📂 Estructura del Proyecto

```text
Clase-37/
├── config/           # Configuración de la base de datos
├── controllers/      # Lógica de negocio para los usuarios
├── middlewares/      # Middleware de autenticación JWT
├── models/           # Definición del esquema de Mongoose
├── routes/           # Definición de las rutas de la API
├── crud.js           # Punto de entrada de la aplicación
├── package.json      # Dependencias y scripts
└── README.md         # Documentación del proyecto
```

## 📝 Notas Adicionales

- El token generado en `/usuarios/login` tiene una validez de **180 segundos**.
- Asegúrate de que MongoDB esté corriendo en `mongodb://localhost:27017` y que la base de datos se llame `personas`.
