# 📰 News Prototype App

Este proyecto es un prototipo de una aplicación **Full Stack** que permite visualizar, archivar y eliminar noticias utilizando **React**, **Express** y **MongoDB**.

El backend incluye una API REST para la entidad `news`.  
Los endpoints principales están en `src/features/news/*.ts` y responden con JSON.  

## 🧱 Tech Stack

### Frontend

- React
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB

### Infraestructura

- Turborepo (para gestionar el proyecto)
- Docker (para la BBDD local y pruebas de integración)
- Vercel (alojamiento del proyecto)

## 🚀 Funcionalidades

### 📄 Vista "Portada"

- Muestra la última noticia no archivada, sacada por fecha de creacíon
- Tiene un diseño como si la noticia hubiera invitado al usuario a leerla

### 📄 Vista "New"

- Muestra todas las noticias nuevas (ordenadas por fecha de creación)
- Cada noticia tiene un botón **"Archive"** por dentro para moverla a la vista "Archived"
- Las nuevas noticias se actualizan automáticamente al ser añadidas a la base de datos

### 📁 Vista "Archived"

- Muestra todas las noticias archivadas (ordenadas por fecha de archivado)
- Cada noticia tiene un botón **"Remove"** para eliminarla definitivamente del sistema

## 💾 Estructura del documento en MongoDB

Cada documento de noticia tiene los siguientes campos:

```json
{
  "title": "Título de la noticia",
  "description": "Descripción corta",
  "date": "Fecha de creación (ISO string)",
  "content": "Contenido completo",
  "author": "Autor de la noticia",
  "archiveDate": "Fecha de archivado (opcional)"
}
```

## 🔍 Pruebas

Casi toda la infraestructura está cubierta de pruebas (unit, integration, e2e)

### 🧠 Backend

- ✅ Pruebas unitarias
- ✅ Pruebas de integración

### 🎨 Frontend

- ✅ Pruebas de UI (interfaz de usuario)
- ✅ Pruebas end-to-end (E2E)

## 🛠️ Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

```markdown
1. Clona este repositorio:
   git clone https://github.com/pavelbeard/news-mern.git

2. Entra al proyecto:
   cd news-mern && code .

3. Lánzalo:

turbo run dev

```

## ▶️ Comandos para ejecutar las pruebas

Ejecuta los siguientes comandos desde la raíz del proyecto o usando `turbo run` según tu configuración:

```bash
# 1. Pruebas unitarias del backend
turbo run test:unit

# 2. Pruebas de integración del backend
turbo run test:int

# 3. Pruebas de UI del frontend
turbo run test:ui

# 4. Pruebas end-to-end del frontend
turbo run test:e2e
```

## ‼️ Otros comandos

Ejecuta los otris comandos desde la raíz del proyecto o usando `turbo run` según tu configuración:

```bash
# 1. Validar todo el proyecto con linters
turbo run lint

# 2. Comprobar los tipos TypeScript
turbo run check-types
```

## 🙋 Sobre este proyecto

Decidí realizar esta aplicación como una forma de demostrar mis capacidades en:

- Gestión de proyectos con Turborepo
- Despliegue y gestión de infraestructura en Vercel
- Arquitectura de aplicaciones full stack modernas con MongoDB y Express

Elegí Vercel como plataforma de alojamiento porque me proporciona una infraestructura bastante buena para desplegar frontend y backend, incluso con recursos limitados. Aunque con Express puede resultar un poco complejo el alojamiento, opté por mantenerlo para reforzar mi experiencia realista en gestión de entornos con restricciones.

Este proyecto no solo representa un ejercicio técnico, sino también una demostración de cómo gestiono proyectos reales de principio a fin.
