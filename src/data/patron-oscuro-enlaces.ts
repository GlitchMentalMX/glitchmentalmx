// Enlaces desde artículos anteriores hacia "Cancelar cuesta más que contratar:
// jugamos al patrón oscuro" (publicado el 2026-10-23), el artículo dedicado al
// videojuego /juego/.
//
// Por qué existe: mismo criterio que sin-oraculos-enlaces.ts. Una pieza nueva que
// solo recibe enlaces desde la home tarda en indexarse; un artículo viejo ya
// indexado y con lectores es la señal más fuerte para decirle a Google que la
// página nueva importa. Aquí además el artículo es el puente entre el análisis y
// el juego, así que conviene que lo encuentre quien lee sobre diseño que empuja
// decisiones, atención al cliente automatizada o datos que cedes sin leer.
//
// Criterio: lote fijo, curado a mano por afinidad temática real, no un campo del
// CMS. Para cambiar el lote basta con editar este archivo.
export const PATRON_OSCURO_ARTICULO = 'cancelar-cuesta-mas-que-contratar-patron-oscuro';

export const PATRON_OSCURO_ENLACES = new Set<string>([
  'la-ia-ya-esta-reemplazando-equipos-completos-de-atencion-al-cliente',
  'tu-privacidad-como-producto-lo-que-cedes-sin-leerlo',
  'como-los-dispositivos-moldean-lo-que-haces-sin-que-lo-notes',
  'como-saber-si-la-ia-te-esta-manipulando-emocionalmente',
  'chatbot-se-equivoco-formato-lo-volvio-inteligencia',
  'walmart-compro-vizio-por-23-mil-millones-solo-para-obtener-tus-datos-de-tv',
  'la-memoria-que-acumulo-la-ia-sobre-ti-no-tiene-dueno',
  'el-truco-del-lock-in-te-atrapan-gratis-te-cobran-despues',
  'el-diseno-detras-de-que-sintamos-que-la-ia-nos-entiende',
  'dopamina-y-diseno-por-que-las-apps-son-adictivas',
  'la-comodidad-que-el-algoritmo-no-te-impuso-la-elegiste',
  'pagas-por-la-ia-que-te-convierte-en-su-empleado-no-remunerado',
]);
