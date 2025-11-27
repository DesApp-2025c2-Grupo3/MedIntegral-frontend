# MedIntegral – Frontend  

> Interfaz de usuario del sistema **MedIntegral**, construida con React y Vite.  
<img width="4032" height="2302" alt="image" src="https://github.com/user-attachments/assets/50fe2b69-f212-4664-b207-0d57e66fc93b" />

---

## Descripción  

MedIntegral-frontend es la parte visual del proyecto MedIntegral, pensado para administrar la gestión de datos médicos / de salud (turnos, pacientes, historial, etc.). El frontend consume una API (backend), presentando formularios, vistas y componentes de interfaz para que los administrativos accedan a las funcionalidades del sistema. 

---

## Aplicación Productiva

La versión productiva de MedIntegral se encuentra actualmente desplegada y accesible en:

[https://medintegral.vmdigitai.com/](https://medintegral.vmdigitai.com/)

Desde esta instancia se puede acceder a todas las funcionalidades principales del sistema:

- Gestión de prestadores

- Administración de agendas y horarios

- Manejo de afiliados

- Estadísticas en tiempo real

- Navegación optimizada y UI responsiva

La aplicación se actualiza automáticamente con cada merge a dev de este repositorio. 

---

## Estructura general  

```
/public – recursos públicos, index.html, favicon, etc.
/src – código fuente React JSX
├── assets – imágenes, logos, estilos y otros recursos estáticos. 
├── components – omponentes reutilizables de UI usados en distintas partes de la app.
├── context – contextos globales de React.
├── hooks – hooks personalizados con lógica reutilizable (fetch, formularios, helpers).
├── layout - componentes estructurales como headers, sidebars, footers y layouts de página.
├── mocks  – datos simulados para desarrollo sin backend o para testing manual.
├── pages – vistas completas asociadas a rutas; representan pantallas de la aplicación.
├── services – funciones para interactuar con la API: fetch/axios, manejo de errores, mappers.
├── utils – utilidades genéricas: formateadores, validadores y funciones auxiliares.
```


Esta organización sigue buenas prácticas de proyectos React + Vite, manteniendo una arquitectura modular y legible.  

---

## Instalación / Desarrollo local  

1. Clonar el repositorio  
```
 git clone https://github.com/DesApp-2025c2-Grupo3/MedIntegral-frontend.git
 cd MedIntegral-frontend
```
2. Instalar dependencias
```
npm install
```
3. Ejecutar en modo desarrollo (con recarga automática — HMR)
```
npm run dev
```
4. Abrir en el browser en la URL que indique la terminal (por defecto suele ser http://localhost:3000)
5.(Opcional) Linter / formateo: si querés asegurarte de seguir las reglas de estilo/proyectos
```
npm run lint
npm run format
``` 

---

## Tecnologías

- React + Vite
- React Routes
- JavaScript
- Material UI
- ESLint / Prettier
  
---

## Equipo

- Ailen Pisoni
- Alina Marquez
- Cristian Gonzalez
- Gabriel Ledezma
- Melina Alvarez
