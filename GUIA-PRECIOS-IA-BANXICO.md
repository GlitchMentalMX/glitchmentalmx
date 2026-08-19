# Guía: tipo de cambio Banxico para "Precios de IA"

Esta guía es para Jorge — no requiere terminal, solo el navegador. Son dos pasos: (1) sacar un token gratis de Banxico y (2) guardarlo en GitHub como "Secret".

## Qué hace esto

Los 14 artículos de la serie "¿Cuánto cuesta [Herramienta] hoy?" muestran el precio en pesos mexicanos usando el tipo de cambio oficial de Banxico. Un robot (GitHub Action) consulta ese tipo de cambio una vez al día y actualiza el sitio solo — tú no tienes que hacer nada día a día. Pero para que el robot pueda consultar a Banxico, necesita una llave (token) que solo tú puedes conseguir.

## Paso 1 — Conseguir el token de Banxico (una sola vez)

1. Entra a **https://www.banxico.org.mx/SieAPIRest/service/v1/token** (o busca "Banxico SIE API token" en Google si la liga cambió).
2. Resuelve el captcha. En la práctica, Banxico entrega el token directo en pantalla al pasar el captcha — no siempre pide correo ni registro adicional (esta parte se corrigió después de que Jorge lo hizo y confirmó que solo le pidió el captcha).
3. Copia ese token completo — es una cadena larga de letras y números, gratis, sin límite de vencimiento conocido. Lo vas a necesitar en el paso 2.
4. Si tienes dudas de que sea legítimo: confírmalo por dos cosas, que la URL donde lo sacaste sea del dominio oficial `banxico.org.mx`, y que su estado salga activo/sano al consultarlo en las herramientas de estado que ofrece el propio sitio de Banxico.

## Paso 2 — Guardarlo como "Secret" en GitHub (solo clicks, sin terminal)

1. Entra a **https://github.com/GlitchMentalMX/glitchmentalmx** en tu navegador, con tu sesión de GitHub iniciada.
2. Click en la pestaña **Settings** (arriba, junto a "Insights").
3. En el menú de la izquierda, busca la sección **Security** y click en **Secrets and variables** → **Actions**.
4. Click en el botón verde **New repository secret**.
5. En **Name**, escribe exactamente: `BANXICO_TOKEN`
6. En **Secret**, pega el token que te mandó Banxico (sin espacios antes o después).
7. Click en **Add secret**.

Listo. A partir de aquí, el robot corre solo todos los días a las 2:00 PM hora CDMX y actualiza el precio en pesos automáticamente.

## Cómo saber si está funcionando

1. En GitHub, entra a la pestaña **Actions** del repositorio.
2. Busca en la lista un flujo llamado **"Actualizar tipo de cambio Banxico"**.
3. Si tiene una palomita verde ✅, corrió bien. Si tiene una X roja ❌, algo falló — lo más común es que el token esté mal copiado; puedes repetir el paso 2 con cuidado de no dejar espacios de más.
4. También puedes forzar que corra ahora mismo (sin esperar a las 2 PM): entra a ese flujo, click en **Run workflow** (botón a la derecha) → **Run workflow** de nuevo para confirmar.

## Qué pasa si Banxico no publica un día (fin de semana o día festivo)

El robot detecta que no hay dato nuevo y deja el archivo tal cual estaba — el sitio sigue mostrando el último precio conocido, con su fecha real (nunca finge que el dato es de hoy si no lo es). No se genera ningún cambio que subir ese día, así que no verás ni un commit ni nada raro en el historial.

## Si algún día cambia el precio oficial en dólares de una herramienta

Eso **no** lo actualiza el robot — el robot solo mueve el tipo de cambio (dólares → pesos). El precio en dólares de cada herramienta vive en el archivo `src/data/precios-ia-usd.json` y hay que editarlo a mano cuando OpenAI, Anthropic, Google, etc. suban o bajen su precio. Avísame cuando eso pase y lo actualizo yo.
