# Sistema de gestión de equipos de PC DOCTOR

Este proyecto es una aplicación full stack que utiliza Express para el backend y React con Vite para el frontend. El backend y el frontend están en carpetas separadas dentro del mismo repositorio.


## Requisitos Previos

- Node.js (https://nodejs.org/)
- npm (https://www.npmjs.com/)
- pnpm (https://pnpm.io/)

## Instalación

Sigue estos pasos para clonar el repositorio y configurar el proyecto:

1. Clona el repositorio:

```sh
git clone https://github.com/ReyserLyn/pc-doctor-web-gestion-equipos.git
cd tu-repositorio
```

### Backend
2. Ve a la carpeta del backend e instala las dependencias:

```sh
cd backend
npm install
```

3. Ejecuta el servidor backend:
```sh
npm run start:sqlite
```
-  El servidor backend debería estar ejecutándose en http://localhost:3000.

### Frontend
4. En una nueva terminal, ve a la carpeta del frontend e instala las dependencias:
```sh
cd frontend
pnpm install
```

5. Ejecuta el servidor de desarrollo de Vite:
```sh
pnpm run dev
```

- La aplicación frontend debería estar ejecutándose en http://localhost:5173.

## Contribuir
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -am 'Agrega nueva funcionalidad').
4. Sube tus cambios (git push origin feature/nueva-funcionalidad).
5. Abre un Pull Request.


### Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

