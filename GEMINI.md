# Informe del Proyecto - Herrería Universal

## 1. Arquitectura General

El proyecto sigue una arquitectura de aplicación de página única (SPA) con un backend de API REST. Esta separación permite un desarrollo y escalado independientes del frontend y el backend.

### 1.1. Tecnologías Utilizadas

*   **Frontend:** React.js con Vite.
*   **Backend:** Node.js con Express.js.
*   **Base de Datos:** MongoDB (integrado a través de Mongoose en el backend).

### 1.2. Estructura del Proyecto

```
herreria-universal/
|-- client/                 # Código del frontend
|   |-- public/             # Archivos públicos
|   |-- src/                # Código fuente del frontend
|   |   |-- assets/         # Recursos estáticos
|   |   |-- components/     # Componentes de React
|   |   |-- pages/          # Páginas de la aplicación
|   |   |-- App.jsx         # Componente principal de la aplicación
|   |   |-- main.jsx        # Punto de entrada del frontend
|   |-- package.json        # Dependencias y scripts del frontend
|-- server/                 # Código del backend
|   |-- controllers/        # Lógica de controladores
|   |-- models/             # Modelos de datos (Mongoose)
|   |-- routes/             # Definición de rutas de la API
|   |-- server.js           # Punto de entrada del backend
|   |-- package.json        # Dependencias y scripts del backend
|-- ARCHITECTURE.md         # Documento de arquitectura
|-- GEMINI.md               # Este documento
|-- README.md               # Documento de introducción al proyecto
```

## 2. Análisis del Frontend (client/)

El frontend está construido con React y Vite. Actualmente, la aplicación muestra un ejemplo básico con un contador.

### 2.1. Dependencias Principales

*   `react` y `react-dom`: Bibliotecas principales de React.
*   `vite`: Herramienta de compilación y desarrollo.
*   `@vitejs/plugin-react`: Plugin para integrar React con Vite.

### 2.2. Scripts Disponibles

*   `dev`: Inicia el servidor de desarrollo de Vite.
*   `build`: Compila la aplicación para producción.
*   `lint`: Ejecuta el linter (ESLint).
*   `preview`: Previsualiza la aplicación compilada.

## 3. Análisis del Backend (server/)

El backend está construido con Node.js y Express. Actualmente, solo tiene un endpoint básico que devuelve "Hello World!".

### 3.1. Dependencias Principales

*   `express`: Framework web para Node.js.
*   `mongoose`: ODM para MongoDB.

### 3.2. Estructura de Archivos

*   `server.js`: Punto de entrada principal. Configura el servidor Express y define rutas básicas.
*   `controllers/`: Contendrá la lógica de negocio.
*   `models/`: Contendrá los modelos de datos definidos con Mongoose.
*   `routes/`: Contendrá las definiciones de las rutas de la API.

## 4. Flujo de Datos (Actual)

1.  El cliente (navegador) carga la aplicación React desde el servidor de desarrollo de Vite (puerto por defecto, probablemente 5173).
2.  La aplicación React (frontend) se ejecuta en el navegador.
3.  El servidor Express (backend) escucha en el puerto 3000.
4.  Las solicitudes del frontend al backend se realizarán a `http://localhost:3000`.

## 5. Próximos Pasos Sugeridos

1.  **Backend:**
    *   Configurar la conexión a MongoDB en `server.js` o en un archivo de configuración dedicado.
    *   Definir modelos de datos en `models/`.
    *   Crear controladores en `controllers/` para manejar la lógica de negocio.
    *   Definir rutas en `routes/` para exponer la API REST.
2.  **Frontend:**
    *   Reemplazar el componente `App.jsx` con la estructura de la aplicación real.
    *   Crear componentes y páginas en `src/components/` y `src/pages/`.
    *   Implementar llamadas a la API del backend (por ejemplo, usando `fetch` o `axios`).
3.  **Integración:**
    *   Asegurar que el frontend pueda comunicarse con el backend (posiblemente ajustando la configuración de proxy en `vite.config.js` para desarrollo).