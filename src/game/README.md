# Videojuego (ruta `/juego/`)

Phaser 3 dentro de Astro, aislado del sitio editorial. **Estado: prototipo, `noindex`, fuera del sitemap.**

## Aislamiento
- **Indexable desde 2026-10-22** (autorizado por Jorge). El SEO de la página vive en `src/pages/juego/index.astro` (title, description, OG, JSON-LD `VideoGame` + `BreadcrumbList`, bloque `.sr-only` con texto real); la imagen para compartir es `public/juego/og.png` (`scripts/generate-juego-og.mjs <captura.jpg>`); enlaces internos: Footer (`Footer.astro`) y tarjeta en 7 artículos afines (`JUEGO_SLUGS` en `src/pages/articulos/[slug].astro`). Ya no hay filtro de `/juego/` en el sitemap.
- `src/pages/juego/index.astro` no usa `Layout.astro`: no hereda header, footer ni banner de cookies (solo reusa el beacon de analytics). Phaser solo se carga en esa ruta.
- Todo el código vive en `src/game/`. Fuera de esta carpeta solo cambian `package.json`/`package-lock.json` (dependencia `phaser@3.90.0`, versión exacta) y, desde el lanzamiento, los enlaces internos y el SEO descritos arriba.
- No hay assets en `public/images/`, así que `prebuild` (watermark + recompresión) no toca nada del juego. Hoy el arte se dibuja por código; cuando haya imágenes finales deben ir en una carpeta propia (p. ej. `public/juego/`), nunca en `public/images/`.
- Sin cookies, cuentas ni red: el progreso va en `localStorage` (`gm-juego:progreso:v1`, `gm-juego:meta:v1`).

## Arquitectura
- `core/` — constantes, dibujo, guardado, estado único (`state`), audio sintetizado (Web Audio, sin archivos).
- `engine/` — `Actor` (rig procedural: idle/caminar/correr/reacciones), `Mover` + `pathfinding` (A* sobre cuadrícula), `Chatbot` (NPC con estados), `ScriptContext` (API de los guiones).
- `scenes/` — `Boot`, `Select`, `World`, `UI` (diálogos, inventario, menú), `Ending`.
- `data/` — contenido: `characters.ts` (los 5 jugables), `sala.ts` (escenario, objetos y guiones), `endings.ts`, `items.ts`, `scenes.ts` (registro).
- `art/` — arte provisional dibujado por código (`characters.ts`, `sala.ts`).

## Pantalla
El escenario de diseño es 9:16 (540x960), pero el canvas se adapta al aspecto real de la pantalla entre 0.42 y 0.75 (ver `core/viewport.ts`) para llenarla: el mundo se extiende a los lados o arriba/abajo y cada escena dibuja decorado ahí (en la sala: baldosas y pared extra). Lo jugable siempre está en los 540x960 centrales; el HUD y los diálogos se pegan a los bordes reales (`viewRect`). Fuera de ese rango (monitores horizontales) queda centrado con barras decorativas.

## Objetos ilustrados de la sala
Los objetos de la sala (asistente con 4 caras, máquina de cookies, impresora, planta, puerta de cancelar) son ilustraciones hechas con GPT, cortadas con `scripts/make-sala-props.mjs` en `public/juego/sala/` (ya reducidas a su tamaño en pantalla, ~290 KB en total). Las texturas se arman en `art/sala.ts` (`imageTex`) y `engine/Chatbot.ts`; si una imagen no carga, se usa el dibujo por código. La segunda tanda (`scripts/make-sala-props-2.mjs`: mostrador, pantalla de turnos, sillas, marco y cristal de la puerta "Suscríbete", e íconos del inventario) se integra igual; con el mostrador ilustrado el bloc de post-its ya viene dibujado y es lo que se toca. Cuidado: las imágenes cargadas se registran en Phaser con el prefijo `src:` para no chocar con las texturas de la escena.

## Música
Dos pistas propias de Jorge (hechas en Flow), recortadas y vueltas bucle con `scripts/make-music-loops.py` (mono AAC 56 kb/s, ~1 MB c/u) en `public/juego/audio/`: `sala.m4a` (la sala) y `menu.m4a` (selección y finales). Se descargan después del primer toque, una a la vez, con fundido entre escenas; si no cargan suena el zumbido sintético de respaldo. "Sonido: no" baja el volumen maestro a 0 y pausa el contexto de audio (silencio total); "Música" apaga solo la pista. Para otra pista: agregarla a `MUSIC_URL` en `core/audio.ts`.

## Rejugabilidad: secretos por personaje
Cada personaje tiene 3 secretos propios (`data/secrets.ts`): rutas o acciones que solo él puede hacer (reiniciar al asistente, morder la planta, saltar la encuesta, atravesar la planta, checkpoint...). Se activan en los guiones con `c.isChar('<id>')` y se registran con `c.discover('<secret-id>')`; se guardan en la meta del navegador. La selección muestra los puntos ●●○ y el final muestra cuáles faltan con una pista. Hay además un final secreto (`turno`, solo CapiCaos). Para agregar uno: una entrada en `SECRETS`, la opción en el guion y `c.discover(...)`.

## Cómo ampliar
- **Preguntas con tiempo:** `c.ask(quien, texto, opciones, segundos)` muestra una barra de tiempo y devuelve `-1` si se agota. La usa el quiz de la máquina de cookies (`cookieQuiz` en `data/sala.ts`), que sale una vez por partida (bandera `cookieQuiz`): se responde bien y el tiempo se acaba igual.
- **Escena nueva:** crear `data/<id>.ts` con un `SceneDef` (`build`, `intro`, `restore`, `inspect`) y registrarla en `data/scenes.ts`. Las interacciones son funciones `async (c: ScriptContext) => …` con `await c.say(...)`, `c.ask(...)`, `c.give(...)`, `c.set(...)`.
- **Personaje nuevo / diferencias de habilidad:** agregar una entrada en `data/characters.ts` (partes, `gait`, `signature`, `lines`). Las habilidades futuras serían un campo más de `CharacterDef`; el movimiento es único.
- **Reemplazar arte provisional con ilustraciones:** cada personaje ilustrado se corta de su hoja de referencia con un script `scripts/make-<id>-sprite.mjs` (usa `scripts/lib/sprite-cut.mjs`) que deja las piezas en `public/juego/<id>/`; se registran en `core/images.ts` (`IMAGE_SETS`) y en `art/characters.ts`. Hoy: los cinco personajes (el dibujo por código queda solo como respaldo). Si una imagen no carga, el personaje usa su dibujo de respaldo por código (`PARTS.<id>Drawn`). Una pose opcional (`CharacterDef.pose`) reemplaza al rig durante la reacción característica.
- **Final nuevo:** agregarlo a `ENDING_IDS` (`core/config.ts`) y a `data/endings.ts`.

## Criterio de contenido
Cada escenario debe cumplir al menos una: (1) hacer reír con una situación absurda de tecnología o cultura digital; (2) hacer experimentar una contradicción real del mundo digital; (3) sorprender con algo que solo existe en este universo.

## Depuración
En `astro dev` el juego expone `window.__game` y `window.__audio`.
