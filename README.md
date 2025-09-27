# SPA Gestión de Productos (React + Vite)

Aplicación tipo SPA para gestionar productos (listar, crear, editar y eliminar) usando la API de [dummyjson.com](https://dummyjson.com).  
Desarrollado con React, Vite, TailwindCSS y React Router.

---

## 🔗 En vivo

La aplicación está desplegada en Netlify:  
https://lambent-sable-4b1076.netlify.app/

---

## 🧰 Tecnologías usadas

- React  
- Vite  
- TypeScript  
- TailwindCSS  
- React Router  
- Fetch API  
- Netlify (para el deploy)

---

## ⚙️ Instalación local

Clona el repositorio:

```bash
git clone https://github.com/leotedd/2parcial.git
cd 2parcial
Instala dependencias:

npm install


Levanta el servidor de desarrollo:

npm run dev


Abre http://localhost:5173 en tu navegador.

📦 Build de producción

Para construir la aplicación lista para desplegar:

npm run build


Genera una carpeta dist/ con los archivos finales.

Para previsualizar localmente:

npm run preview

🧩 Endpoints usados (DummyJSON)

GET /products?limit=<num>&skip=<num>: Obtener lista de productos

POST /products/add: Crear nuevo producto

PATCH /products/:id: Actualizar un producto

DELETE /products/:id: Eliminar un producto

Nota: DummyJSON simula cambios pero no los persiste realmente.

🚀 Deploy en Netlify

Ejecutar npm run build

En Netlify, conectar el repositorio GitHub

Configurar:

Build command: npm run build

Publish directory: dist

Agregar archivo public/_redirects con:

/*  /index.html  200


Esto garantiza que las rutas internas funcionen correctamente.

👀 Capturas de pantalla

Si deseas, puedes agregar capturas dentro de la carpeta assets y referenciarlas así:

### Lista de productos  
![Lista de productos](src/assets/captura-home.png)

### Formulario nuevo producto  
![Formulario](src/assets/captura-nuevo.png)

🤝 Créditos

Hecho por LeoTedd como parte del proyecto de laboratorio.
API usada: dummyjson.com