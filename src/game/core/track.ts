// Medición anónima del juego con el MISMO Worker y las MISMAS reglas que el
// resto del sitio (cloudflare/analytics-worker.js): sin cookies, sin IP
// guardada, sin identificador entre días. Respeta la exclusión de Jorge
// (localStorage 'gm-no-analytics', que se activa abriendo cualquier página
// con ?gm-optout=1) y no cuenta nada en localhost ni en previews.
// Los eventos llegan a la tabla `events` del Worker y salen en /stats por nombre.
const WORKER_URL = 'https://glitchmental-analytics.contacto-fbf.workers.dev/collect';

export function track(event: string, data?: Record<string, string | number | boolean>): void {
  try {
    if (localStorage.getItem('gm-no-analytics')) return;
    const host = location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.includes('preview')) return;
    const payload = JSON.stringify({ event, path: location.pathname, data, width: window.screen?.width || 0 });
    navigator.sendBeacon(WORKER_URL, new Blob([payload], { type: 'text/plain' }));
  } catch {
    // Un fallo de medición nunca debe verse en el juego.
  }
}
