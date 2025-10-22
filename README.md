# Proyecto de Plantillas de Email con MJML y Handlebars

Este proyecto permite generar correos electrónicos responsivos y multi-idioma utilizando **MJML** para el diseño y **Handlebars** para la integración de contenido dinámico y traducciones.

---

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Personalización](#personalización)
  - [Agregar un nuevo idioma](#agregar-un-nuevo-idioma)
  - [Agregar nuevas secciones o partials](#agregar-nuevas-secciones-o-partials)
    - [Recomendaciones de desarrollo](#recomendaciones-de-desarrollo)
  - [Cambiar estilos](#cambiar-estilos)
  - [Cambiar diseño del correo](#cambiar-diseño-del-correo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Dependencias](#dependencias)

## Características

- Plantillas modulares usando MJML (`header`, `footer`, secciones de contenido).
- Traducciones multi-idioma (`es.json`, `en.json`, etc.)
- Generación de correos HTML listos para enviar.
- Interfaz de línea de comandos que permite seleccionar el idioma del correo.

---

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/andrezzz2312/mailing-event.git
cd mailing-event
```

2. Instala dependencias:

```
npm install
```

## Uso

Para generar un correo electrónico con la plantilla actual:

```
npm run build
```

El script preguntará por el idioma deseado (actualmente cuenta con español: "es" e ingles: "en") :

```
Ingresa el lenguaje de la plantilla (ej: es, en):
```

Ingresas alguno de los 2 con el teclado y la consola devolverá:

```
✅ Correo creado exitosamente: dist/email-{lenguaje}.html
```

En caso de no ingresar argumento por defecto se creará la version en español.

## Personalización

- ### Agregar un nuevo idioma:

1. Crear un archivo JSON en src/translations/ con el código de idioma, por ejemplo `fr.json`.

2. Llenar las claves de traducción que utiliza tu plantilla.

- ### Agregar nuevas secciones o partials:

- #### Recomendaciones de desarrollo
  Durante la etapa de desarrollo de la plantilla, se recomienda trabajar con `event-invitation-template.mjml` para poder ver los cambios en tiempo real.
  Para probar la plantilla, puedes ejecutar:
  ```
  npm run template
  ```
  generando así un archivo `email-template` en la carpeta dist

1. Una vez que la sección ha sido probada y validada en desarrollo, puede moverse a src/partials/ como un archivo MJML independiente.

2. Para incluir la sección en la plantilla final `event-invitation.hbs`, agrégala usando la sintaxis de Handlebars:
   ```
   {{> nombreDelPartial}}
   ```

- ### Cambiar estilos

  Todos los estilos y media queries se manejan en `base.mjml` , sin embargo tambien es posible generar estilos directamente en sus respectivos archivos en la carpeta partials

- ### Cambiar diseño del correo:

  Edita src/layouts/base.mjml para modificar estilos globales o estructura base.

---

## Estructura del Proyecto

```
├── 🟨 build.js
├── 📁 dist
│ ├── 📄 email-en.html
│ ├── 📄 email-es.html
│ ├── 📄 email-template.html
├── 🗂️ package-lock.json
├── 🗂️ package.json
├── 📜 README.md
├── 📁 src
│ ├── 📁 assets
│ │ ├── 🖼️ banner1.jpg
│ │ ├── 🖼️ banner2.jpg
│ │ ├── 🖼️ banner3.jpg
│ │ ├── 🖼️ banner4.jpg
│ │ ├── 🖼️ banner5.jpg
│ │ ├── 🖼️ facebook.png
│ │ ├── 🖼️ instagram.png
│ │ ├── 🖼️ logo.png
│ │ ├── 🖼️ logoname.png
│ │ ├── 🖼️ twitter.png
│ ├── 🗂️ data.json
│ ├── 📁 layouts
│ │ ├── 📄 base.mjml
│ ├── 📁 partials
│ │ ├── 📄 event-invitation.mjml
│ │ ├── 📄 footer.mjml
│ │ ├── 📄 header.mjml
│ ├── 📁 templates
│ │ ├── 📄 event-invitation.hbs
│ │ ├── 📄 event-invitation.mjml
│ ├── 📁 translations
│ │ ├── 🗂️ en.json
│ │ ├── 🗂️ es.json

```

### Dependencias

- MJML

- Handlebars

- fs-extra

- readline-sync
