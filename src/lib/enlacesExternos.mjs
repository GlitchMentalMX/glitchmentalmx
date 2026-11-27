import { defineHastPlugin } from 'satteri';

// Todo enlace de markdown que sale del sitio (http/https a otro dominio) se
// abre en pestaña nueva, para que quien lee un artículo no pierda su lugar ni
// abandone glitchMentalMX al revisar una fuente. Markdown no puede poner
// `target`, así que se agrega al HTML en build — sin depender de JS en el
// navegador. Los enlaces internos, mailto: y anclas no se tocan.
// También conserva la regla anterior: un enlace cuyo texto lleva la flecha ↗
// siempre promete pestaña nueva, aunque apunte al propio sitio.
const ES_EXTERNO = /^https?:\/\/(?!(?:www\.)?glitchmental\.com(?:[/?#]|$))/i;

export const enlacesExternos = defineHastPlugin({
  name: 'enlaces-externos',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      const externo = typeof href === 'string' && ES_EXTERNO.test(href);
      if (!externo && !ctx.textContent(node).includes('↗')) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', 'noopener noreferrer');
    },
  },
});
