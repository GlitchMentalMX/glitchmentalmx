# Bridgy Fed (fediverse) — instrucciones para Jorge

Esto conecta glitchmental.com al fediverse (Mastodon, etc.) vía Bridgy Fed.
Requiere mover el DNS del dominio a Cloudflare — es la única forma de hacer
el redirect dinámico que pide Bridgy Fed (`/.well-known/webfinger` y
`/.well-known/host-meta`, preservando el query string), porque GitHub Pages
no puede hacerlo por sí solo (sirve archivos fijos, no puede leer un
`?resource=...` y decidir a dónde mandarlo).

No se necesita ningún Worker para esto — se resuelve con **Redirect Rules**
de Cloudflare, sin código, en el dashboard.

## 1. Agregar el dominio a Cloudflare

1. Entra a **dash.cloudflare.com** → **Add a site**.
2. Escribe `glitchmental.com` → plan **Free**.
3. Cloudflare va a escanear los registros DNS actuales automáticamente y
   debería encontrar los 4 registros `A` que ya apuntan a GitHub Pages
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`). Verifica que estén ahí — si falta alguno, agrégalo
   a mano con esos mismos valores.
4. Para cada uno de esos 4 registros `A`: la nube debe quedar **naranja**
   (Proxied), no gris (DNS only) — eso es lo que activa Cloudflare como
   intermediario y hace posible el redirect.
5. Si tienes un registro para `www` (CNAME a `glitchmental.com` o similar),
   déjalo también en naranja.

## 2. Cambiar los nameservers

1. Cloudflare te va a mostrar 2 nameservers propios (algo como
   `xxx.ns.cloudflare.com` y `yyy.ns.cloudflare.com`).
2. Entra al panel de tu **registrador de dominio** (donde compraste
   glitchmental.com — GoDaddy, Namecheap, el que sea) y reemplaza los
   nameservers actuales por esos 2.
3. Puede tardar desde minutos hasta 24 horas en propagarse. Cloudflare te
   avisa por correo cuando el dominio queda activo.

## 3. Modo SSL correcto (importante, evita loops)

1. Ya con el dominio activo en Cloudflare: **SSL/TLS** → **Overview**.
2. Selecciona **Full (strict)** — GitHub Pages ya sirve HTTPS con
   certificado válido en el dominio custom, así que esto funciona sin
   fricción. **No uses "Flexible"** — con Flexible el sitio puede quedar
   en un loop de redirects o mostrarse como inseguro.
3. Opcional pero recomendado: **SSL/TLS** → **Edge Certificates** →
   activa **Always Use HTTPS**.

## 4. Las 2 reglas de redirect

1. **Rules** → **Redirect Rules** (a veces aparece como "Single
   Redirects").
2. **Create rule**. Primera regla:
   - **Rule name**: `webfinger a Bridgy Fed`
   - **When incoming requests match**: Field `URI Path` — Operator
     `equals` — Value `/.well-known/webfinger`
   - **Then**: Type `Static` — URL
     `https://fed.brid.gy/.well-known/webfinger`
   - **Preserve query string**: actívalo (ON) — esto es lo que hace que
     `?resource=...` viaje intacto hacia Bridgy Fed.
   - **Status code**: `302`
   - Guarda.
3. Repite para la segunda regla:
   - **Rule name**: `host-meta a Bridgy Fed`
   - **When incoming requests match**: Field `URI Path` — Operator
     `equals` — Value `/.well-known/host-meta`
   - **Then**: Type `Static` — URL `https://fed.brid.gy/.well-known/host-meta`
   - **Preserve query string**: ON
   - **Status code**: `302`
   - Guarda.

## 5. Verificar

Desde una terminal (o pídeme que lo verifique yo cuando esté activo):

```
curl -sI "https://glitchmental.com/.well-known/webfinger?resource=acct:glitchmental.com@glitchmental.com"
curl -sI "https://glitchmental.com/.well-known/host-meta"
```

Ambos deberían responder `302` con un header `location:` apuntando a
`fed.brid.gy` y conservando el `?resource=...` en el primero.

## Qué NO cambia

- El sitio sigue construyéndose y desplegándose igual, vía GitHub Pages —
  Cloudflare solo se pone "delante" como proxy de DNS, no reemplaza el
  hosting.
- El resto de rutas del sitio (`/rss.xml`, `/sitemap-index.xml`, artículos,
  etc.) siguen sirviéndose exactamente igual, sin ningún redirect — las
  reglas de arriba solo aplican a esos 2 paths exactos.
- Los Workers existentes (analytics, OAuth de Sveltia, GlitchSearch) no se
  tocan — siguen en sus propios subdominios `*.contacto-fbf.workers.dev`,
  ajenos a este cambio.
