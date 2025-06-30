# Prueba Técnica - Tienda de Smartphones

Descripción del proyecto...

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    cd tu-repositorio
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Este proyecto requiere una API key para conectarse con el backend.

    * Copia el archivo de ejemplo `.env.example` para crear tu archivo de configuración local. Puedes hacerlo con el siguiente comando:

        *En Windows (Command Prompt):*
        ```bash
        copy .env.example .env.local
        ```
        *En Linux / macOS / PowerShell:*
        ```bash
        cp .env.example .env.local
        ```

    * Abre el nuevo archivo `.env.local` y añade la API key proporcionada para la prueba:
        ```
        NEXT_PUBLIC_API_KEY=87909682e6cd74208f41a6ef39fe4191
        ```

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

¡La aplicación debería estar funcionando en [http://localhost:3000](http://localhost:3000)!