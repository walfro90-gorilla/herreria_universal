# Arquitectura de la Aplicación Web - Herrería Universal

## 1. Resumen

Esta aplicación web será una aplicación de página única (SPA) con un backend de API REST. Esta arquitectura separa las preocupaciones del frontend y del backend, lo que permite un desarrollo y escalado independientes.

## 2. Pila de Tecnología

*   **Frontend:** React.js (con Vite para el entorno de desarrollo)
*   **Backend:** Node.js con el framework Express.js
*   **Base de Datos:** MongoDB

## 3. Estructura del Proyecto

El proyecto se organizará en dos directorios principales: `client` para el código del frontend y `server` para el código del backend.

```
herreria-universal/
|-- client/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |-- package.json
|-- server/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- server.js
|   |-- package.json
|-- ARCHITECTURE.md
|-- README.md
```

## 4. Flujo de Datos

1.  El cliente (navegador) carga la aplicación React.
2.  La aplicación React realiza solicitudes HTTP (usando `fetch` o `axios`) a la API REST del backend.
3.  El backend de Express.js recibe las solicitudes, interactúa con la base de datos de MongoDB (a través de los modelos) y devuelve los datos en formato JSON.
4.  La aplicación React recibe los datos y actualiza la interfaz de usuario.
