// Avisa a Bing y a los demás buscadores de IndexNow (Yandex, Naver, Seznam,
// Yep) de las URLs que cambiaron. Se corre DESPUÉS de publicar el sitio
// (ver .github/workflows/deploy.yml). Lee el sitemap en vivo y manda solo las
// URLs con lastmod de los últimos DIAS días — IndexNow pide mandar lo que
// cambió, no el sitio completo cada vez.
//
// La clave no es secreta: IndexNow exige que el archivo public/<clave>.txt
// sea público para comprobar que el sitio es tuyo.
//
// Nunca debe romper una publicación: cualquier error solo se registra y el
// proceso termina con código 0.
const HOST = 'glitchmental.com';
const KEY = '3005a59224d8d1f699df9dedfb0bccec';
const DIAS = 2;
const MAX_URLS = 10000;

async function main() {
  const res = await fetch(`https://${HOST}/sitemap-0.xml?t=${Date.now()}`);
  if (!res.ok) throw new Error(`sitemap HTTP ${res.status}`);
  const xml = await res.text();
  const limite = Date.now() - DIAS * 24 * 3600 * 1000;
  const urls = [];
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    const mod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (loc && mod && Date.parse(mod) >= limite) urls.push(loc);
  }
  if (urls.length === 0) {
    console.log('IndexNow: sin URLs con cambios recientes, nada que enviar.');
    return;
  }
  const lote = urls.slice(0, MAX_URLS);
  const envio = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: lote }),
  });
  console.log(`IndexNow: ${lote.length} URLs enviadas, respuesta HTTP ${envio.status}.`);
}

main().catch((e) => console.log(`IndexNow: no se pudo enviar (${e.message}). La publicación no se afecta.`));
