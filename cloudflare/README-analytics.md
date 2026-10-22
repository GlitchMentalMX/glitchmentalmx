# Analytics propio — instrucciones para Jorge

Todo esto es en el dashboard de Cloudflare, con clics — no necesitas abrir
ninguna terminal ni instalar nada.

## 1. Crear la base de datos (D1)

1. Entra a **dash.cloudflare.com** → tu cuenta.
2. En el menú de la izquierda: **Workers & Pages** → **D1 SQL Database**
   (a veces aparece como **Storage & Databases → D1**).
3. Botón **Create Database**.
4. Nombre: `glitchmental-analytics` (el nombre no importa técnicamente,
   pero usa este para que todo quede consistente).
5. **Create**.

## 2. Crear la tabla

1. Ya dentro de la base de datos que acabas de crear, ve a la pestaña
   **Console**.
2. Abre el archivo `cloudflare/analytics-schema.sql` de este repositorio,
   copia **todo** el contenido.
3. Pégalo en la consola y dale a **Execute** (o el botón de correr que
   veas ahí).
4. Deberías ver que se creó la tabla `hits` sin errores.

## 3. Crear el Worker

1. **Workers & Pages** → **Create** (puede aparecer como **Create Application**)
   → elige **Workers** (no Pages) → una plantilla en blanco tipo "Hello World".
2. **Antes de darle Deploy**, cámbiale el nombre a exactamente
   `glitchmental-analytics` — **este nombre sí importa**, porque el sitio y
   el panel ya están configurados para buscarlo en
   `https://glitchmental-analytics.contacto-fbf.workers.dev` (ese es tu
   subdominio real de workers.dev, confirmado con el que ya usa el Worker
   de Decap). Si Cloudflare ya te asignó un nombre aleatorio (algo como
   "polished-violet-3d4d") porque no alcanzaste a cambiarlo, no pasa nada:
   bórralo desde Settings → Delete y créalo de nuevo con el nombre correcto
   — como todavía no tiene código ni datos, no se pierde nada.
3. **Deploy** (te va a crear un Worker de ejemplo, "Hello World" — normal).
4. Botón **Edit code** para abrir el editor en línea.
5. Borra todo el contenido de ahí y pega **completo** el archivo
   `cloudflare/analytics-worker.js` de este repositorio.
6. **Save and Deploy**.

## 4. Conectar la base de datos al Worker (binding)

1. Dentro del Worker: pestaña **Settings** → **Bindings**.
2. **Add binding** → elige **D1 database**.
3. **Variable name**: escribe exactamente `DB` (en mayúsculas, tal cual —
   el código lo busca con ese nombre exacto).
4. **D1 database**: selecciona `glitchmental-analytics` (la que creaste en
   el paso 1).
5. Guarda.

## 5. Los dos secretos

En el mismo Worker: **Settings** → **Variables and Secrets** (a veces
aparece como "Environment Variables").

Necesitas crear **dos** variables, ambas como **Secret** (encriptadas, no
como texto plano — es una opción/checkbox al agregarlas):

- **`ANALYTICS_SALT`** — cualquier texto largo y aleatorio, entre 20 y 40
  caracteres. Es la "sal" que se mezcla con la IP antes de convertirla en
  un código anónimo — nunca se guarda la IP tal cual. Puedes generarlo
  con un gestor de contraseñas (pídele que te dé una contraseña aleatoria
  de 32 caracteres) o cualquier generador de contraseñas en línea de tu
  confianza.
- **`STATS_TOKEN`** — otro texto largo y aleatorio, del mismo estilo. Este
  es el que vas a usar TÚ para entrar al panel en `/stats/` — apúntalo en
  tu gestor de contraseñas, porque no hay forma de recuperarlo después
  desde el dashboard, solo cambiarlo por uno nuevo.

Para cada uno: **Add variable** → nombre exacto (`ANALYTICS_SALT` o
`STATS_TOKEN`) → marca que sea **Secret/Encrypt** → pega el valor →
guarda. Al final, **Save and Deploy** para que el Worker tome los cambios.

## 6. Verificar que está funcionando

1. Entra a **glitchmental.com** (el sitio en vivo) y navega un par de
   páginas.
2. Espera uno o dos minutos.
3. Entra a **glitchmental.com/stats/**.
4. Pega el valor que le diste a `STATS_TOKEN` y dale **Entrar**.
5. Deberías ver el panel con al menos las vistas que acabas de generar tú
   mismo navegando. Si dice "Token incorrecto" revisa que lo hayas
   pegado sin espacios de más; si dice que no se pudo conectar, revisa
   que el Worker haya quedado desplegado (paso 3) y con el binding
   correcto (paso 4).

## Cómo excluirte a ti mismo de tus propias estadísticas

Entra una vez a cualquier página del sitio agregando `?gm-optout=1` al
final de la URL, por ejemplo:

```
https://glitchmental.com/?gm-optout=1
```

Con eso, ese navegador queda marcado para no mandar más datos —
funciona por navegador/dispositivo, así que si navegas desde el celular
y la computadora, hazlo en ambos una vez.

## Actualización: tracking del botón "Fuente preferida" (agosto 2026)

Se agregó una tabla nueva (`events`) para medir clics en el botón de
"Fuentes Preferidas" de Google (footer, fin de artículo, Dato Incómodo).
Para que quede activo en producción:

1. **Base de datos**: entra a la Console de tu D1 (mismo lugar del paso 2
   de arriba) y pega **solo la parte nueva** de `analytics-schema.sql` —
   el bloque de `CREATE TABLE IF NOT EXISTS events` y sus dos índices al
   final del archivo. `IF NOT EXISTS` hace que sea seguro volver a pegar
   el archivo completo si prefieres no buscar el fragmento.
2. **Worker**: vuelve a `Edit code` en el Worker `glitchmental-analytics`,
   borra todo y pega de nuevo el `analytics-worker.js` actualizado de
   este repositorio (el `/collect` sigue siendo el mismo endpoint —
   ahora simplemente distingue vistas de página de este evento nuevo).
   **Save and Deploy**.
3. No hace falta tocar bindings ni secretos — usa los mismos `DB`,
   `ANALYTICS_SALT` y `STATS_TOKEN` que ya tienes configurados.
4. En `/stats/` vas a ver una tabla nueva, "Fuente preferida — clics por
   ubicación", una vez que haya al menos un clic registrado.

## Qué NO incluye esto (a propósito, por ahora)

- No hay una tarea automática que borre datos viejos — la tabla crece
  indefinidamente. Si en unos meses quieres limpiar datos antiguos, se
  puede agregar después.
- No hay tablas de resumen/rollups — cada consulta del panel cuenta
  filas en vivo. Para el volumen de tráfico de este sitio no debería
  notarse, pero si algún día se siente lento, ahí es donde se optimiza.
- No toca la Política de Privacidad del sitio — eso lo redactas tú
  aparte cuando quieras mencionar este sistema.

## Actualización: duración, scroll, "Ahora" y "Directo" real (octubre 2026)

Qué agrega: tiempo en página (solo con la pestaña visible), scroll máximo,
bloque "Ahora mismo" (se refresca solo cada 30 s), tabla de por dónde entra
el tráfico "Directo", y separa la **navegación interna** (antes se contaba
como "Directo") y los navegadores dentro de apps (Instagram, Facebook, etc.,
ahora cuentan como redes sociales).

**El orden importa** — si lo haces al revés se pierden vistas o se guardan
vistas falsas, sin ningún error visible:

1. **D1 primero**: Console de la base → pega completo
   `cloudflare/analytics-migration-2026-10.sql` → Execute. (Si repites,
   "duplicate column name" es inofensivo.)
2. **Worker segundo**: `Edit code` → borra todo → pega el nuevo
   `analytics-worker.js` → **Save and Deploy**.
3. **Sitio al final**: haz push, para que el beacon nuevo salga a producción.

Costo: cada lector manda un latido cada 30 s (máx. 30 min por vista), y cada
latido es una escritura en D1. El plan gratis de D1 permite 100,000
escrituras al día; con ~1,000 vistas diarias de 2 min promedio son ~5,000.
Si algún día te acercas al límite, sube `30000` a `60000` en
`src/components/Analytics.astro` y la cuenta se reduce a la mitad.
