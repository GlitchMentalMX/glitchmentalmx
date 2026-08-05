# Guía de publicación — GlitchMentalMX en Astro + GitHub Pages

Esta guía asume que nunca has usado la terminal, Git o GitHub. Sigue los pasos
en orden. Ninguno requiere saber programar.

---

## Parte 1 — Ver el sitio en tu computadora

1. Abre la aplicación **Terminal** (en tu Mac: Cmd+Espacio, escribe "Terminal", Enter).
2. Escribe esto y presiona Enter (ajusta la ruta si moviste la carpeta):
   ```bash
   cd /Users/jorgediaz/Downloads/entrega-code/glitchmentalmx
   ```
3. La primera vez, instala las piezas que el sitio necesita para funcionar:
   ```bash
   npm install
   ```
   Esto tarda uno o dos minutos y solo hace falta hacerlo una vez (o cuando
   vuelvas a descargar el proyecto en otra computadora).
4. Arranca el sitio en modo de vista previa:
   ```bash
   npm run dev
   ```
5. Abre tu navegador en **http://localhost:4321** — ahí está el sitio completo,
   funcionando en tu computadora, nadie más lo puede ver todavía.
6. Para apagarlo, regresa a la Terminal y presiona `Ctrl + C`.

Cada vez que quieras ver el sitio de nuevo, repite los pasos 1, 2 y 4 (el
`npm install` del paso 3 ya no hace falta a menos que veas un error).

---

## Parte 2 — Subir el proyecto a GitHub

### 2.1 Crear el repositorio en GitHub

1. Entra a [github.com](https://github.com) y asegúrate de haber iniciado
   sesión con la cuenta **contacto@glitchmental.com**.
2. Haz clic en el botón verde **New** (o el ícono `+` arriba a la derecha →
   "New repository").
3. En **Repository name** escribe: `glitchmentalmx`
4. Déjalo en **Public** (tiene que ser público para usar GitHub Pages gratis).
5. **No marques** ninguna casilla de "Add a README" ni ".gitignore" — el
   proyecto ya trae todo eso.
6. Haz clic en **Create repository**.
7. GitHub te va a mostrar una página con comandos — no los necesitas, ya
   tienes el proyecto listo. Solo copia la URL que aparece ahí, algo como:
   `https://github.com/TU-USUARIO/glitchmentalmx.git`

### 2.2 Subir el código

De vuelta en la Terminal, dentro de la carpeta del proyecto:

```bash
git remote add origin https://github.com/TU-USUARIO/glitchmentalmx.git
git push -u origin main
```

Reemplaza la URL por la que copiaste en el paso anterior. La primera vez que
hagas `git push`, es posible que se abra una ventana pidiéndote iniciar
sesión en GitHub — sigue las instrucciones en pantalla (es normal y solo
pasa una vez).

Cuando termine, actualiza la página de tu repositorio en GitHub — deberías
ver los 379 artículos y todos los archivos del proyecto ahí.

> **Nota técnica:** los commits de este proyecto quedaron firmados como
> "Jorge A. Diaz Elizondo <contacto@glitchmental.com>" a nivel de este
> repositorio (no afecta ninguna otra configuración de Git en tu Mac). Si
> prefieres otro nombre, dímelo y lo ajusto.

---

## Parte 3 — Activar GitHub Pages

1. En tu repositorio en GitHub, ve a la pestaña **Settings**.
2. En el menú de la izquierda, haz clic en **Pages**.
3. En **Build and deployment → Source**, elige **GitHub Actions** (no
   "Deploy from a branch").
4. Eso es todo. El proyecto ya incluye un archivo
   (`.github/workflows/deploy.yml`) que le dice a GitHub que construya y
   publique el sitio automáticamente cada vez que subas cambios a la rama
   `main`.
5. Ve a la pestaña **Actions** de tu repositorio — vas a ver un proceso
   corriendo ("Publicar sitio en GitHub Pages"). Tarda 1–2 minutos. Cuando
   termine con una palomita verde ✓, tu sitio ya está publicado en:
   `https://TU-USUARIO.github.io/glitchmentalmx/`

Ese link temporal ya funciona, pero el paso final es conectar tu dominio
propio `glitchmental.com`.

---

## Parte 4 — Conectar el dominio glitchmental.com

Esto tiene dos partes: decirle a **GitHub** cuál es tu dominio, y decirle a
tu **proveedor de dominio** (donde compraste glitchmental.com) que apunte
hacia GitHub.

### 4.1 En GitHub

El proyecto ya incluye un archivo `CNAME` con `glitchmental.com` adentro, así
que en cuanto conectes el DNS (siguiente paso), GitHub lo detecta solo. Aun
así, confírmalo:

1. En **Settings → Pages** de tu repositorio, en el campo **Custom domain**
   debería aparecer ya `glitchmental.com`. Si no aparece, escríbelo ahí y
   guarda.

### 4.2 En tu proveedor de dominio (donde compraste glitchmental.com)

Ahora mismo ese dominio apunta a Blogger. Vas a **reemplazar** esos registros
por los de GitHub Pages. Entra al panel de administración de DNS de tu
dominio (GoDaddy, Namecheap, Google Domains, etc. — donde lo hayas comprado)
y busca la sección de **DNS** o **Registros DNS**.

**Elimina** cualquier registro tipo `A` o `CNAME` existente que apunte a
Blogger (normalmente verás IPs de Google o algo como `ghs.google.com`), y
agrega estos en su lugar:

Cuatro registros tipo **A**, todos para el dominio raíz (`@` o en blanco,
según tu proveedor), apuntando a estas cuatro direcciones IP de GitHub:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Y un registro tipo **CNAME** para el subdominio `www`:

```
www   CNAME   TU-USUARIO.github.io.
```

(Cambia `TU-USUARIO` por tu usuario de GitHub.)

Los cambios de DNS pueden tardar entre unos minutos y 24–48 horas en
propagarse por completo — es normal, no significa que algo esté mal.

### 4.3 Activar HTTPS

Una vez que el DNS haya propagado (puedes verificarlo abriendo
`https://glitchmental.com` y viendo si carga tu sitio), regresa a
**Settings → Pages** en GitHub y marca la casilla **Enforce HTTPS**. Esto
puede tardar un rato en aparecer disponible — si no está la casilla todavía,
espera unas horas y vuelve a intentar.

---

## Parte 5 — Publicar cambios en el futuro

Cada vez que quieras editar un artículo o agregar contenido:

1. Edita los archivos dentro de `src/content/posts/` (cada artículo es un
   archivo `.md`).
2. En la Terminal, dentro de la carpeta del proyecto:
   ```bash
   git add -A
   git commit -m "describe brevemente qué cambiaste"
   git push
   ```
3. En 1–2 minutos, GitHub Actions reconstruye y publica el sitio solo. No
   necesitas repetir ninguno de los pasos de configuración.

---

## Cosas que quedan pendientes de tu lado

Estas son decisiones o acciones que solo tú puedes tomar (no son técnicas,
son de cuenta/negocio):

- **Google Programmable Search Engine (GlitchSearch):** sigue configurado
  para buscar dentro de `glitchmental.com`, así que debería seguir
  funcionando igual sin que hagas nada. Si notas que los resultados de
  búsqueda no aparecen tras la migración, revisa la configuración del motor
  en [programmablesearchengine.google.com](https://programmablesearchengine.google.com).
- **Formulario de suscripción (Tally):** sigue siendo el mismo
  (`tally.so/r/ODazJM`) — no requiere cambios. Si quieres que redirija a la
  nueva página de agradecimiento (`/gracias/`) en vez de a Blogger, puedes
  ajustarlo desde el panel de Tally.
- **PDFs del Índice y el Manual del Caos Digital:** siguen enlazados a los
  mismos archivos de Google Drive de siempre — confirma que los permisos de
  esos archivos sigan en "cualquiera con el enlace puede ver".
- **La clave de IA de GlitchSearch** (Gemini) y el worker de Groq que
  respaldan el "veredicto de IA" son los mismos que ya usabas — no cambié
  nada ahí. Como ya lo sabes por cómo funcionaba antes, esa clave viaja en
  el código que ve el navegador (es la única forma de que funcione en un
  sitio 100% estático como este, sin servidor propio); si en algún momento
  quieres rotarla o ponerle restricciones de dominio en la consola de
  Google, es buen momento para revisarlo.
