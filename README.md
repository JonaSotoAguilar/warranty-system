# Sistema de Gestión de Garantías (Warranty System)

Este proyecto es una aplicación web moderna diseñada para administrar el ciclo de vida de garantías de productos. Permite registrar ingresos, gestionar estados, controlar ubicaciones y visualizar métricas clave como tiempos de espera y costos de reparación.

## 🚀 Tecnologías

El proyecto está construido con un stack tecnológico moderno y robusto:

- **Framework Principal**: [Next.js 14](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Base de Datos**: [SQLite](https://www.sqlite.org/) (Entorno local)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Manejo de Fechas**: [date-fns](https://date-fns.org/)

## 📋 Características Principales

- **Gestión de Garantías**: CRUD completo (Crear, Leer, Actualizar, Borrar) de tickets de garantía.
- **Control de Estados**:
  - `Pendiente`: Garantía ingresada y en proceso.
  - `Lista`: Producto reparado/revisado, listo para retiro.
  - `Completada`: Producto entregado al cliente (proceso cerrado).
- **Cálculo de Tiempos**: Visualización automática de días transcurridos desde el ingreso (Business Days).
- **Indicadores Visuales**: Badges de colores según la antigüedad del ticket (Verde, Naranja, Rojo).
- **Validaciones Locales**: Formateo y validación de RUT chileno y teléfonos.
- **Ubicaciones**: Gestión dinámica de la ubicación física del producto (Recepción, Taller, Bodega, etc.).
- **Búsqueda y Paginación**: Filtrado rápido por cliente, producto o número de boleta, con navegación paginada.

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio**

    ```bash
    git clone <url-del-repositorio>
    cd warranty-system
    ```

2.  **Instalar dependencias**

    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**

    Crea un archivo `.env` en la raíz del proyecto basándote en el ejemplo (o simplemente definiendo la URL de la base de datos local):

    ```env
    DATABASE_URL="file:./dev.db"
    ```

4.  **Inicializar la Base de Datos**

    Ejecuta las migraciones de Prisma para crear las tablas:

    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Poblar con Datos de Prueba (Opcional)**

    Puedes ejecutar el script de seed para cargar datos ficticios:

    ```bash
    npx tsx prisma/seed-dummy.ts
    ```

## ▶️ Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## 📁 Estructura del Proyecto

- `/app`: Rutas y páginas de Next.js (App Router).
- `/components`: Componentes de React reutilizables (Modales, Tablas, UI Kit).
- `/lib`: Utilidades, tipos y configuración de Prisma.
- `/prisma`: Esquema de base de datos y scripts de seed.
- `/public`: Archivos estáticos.

## 🤝 Contribución

1.  Hacer un fork del repositorio.
2.  Crear una rama para tu feature (`git checkout -b feature/nueva-feature`).
3.  Hacer commit de tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`).
4.  Hacer push a la rama (`git push origin feature/nueva-feature`).
5.  Abrir un Pull Request.
