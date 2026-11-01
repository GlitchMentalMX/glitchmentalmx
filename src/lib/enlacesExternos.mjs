import { defineHastPlugin } from 'satteri';

// Los enlaces de markdown cuyo texto lleva la flecha ↗ prometen abrir en
// pestaña nueva. Markdown no puede poner `target`, así que se agrega al HTML
// en build — sin depender de JS en el navegador.
export const enlacesExternos = defineHastPlugin({
  name: 'enlaces-externos',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      if (!ctx.textContent(node).includes('↗')) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', 'noopener noreferrer');
    },
  },
});
