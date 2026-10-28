// Preguntas de afinación de "¿Qué IA me conviene?" y sus opciones. Una sola
// definición para el quiz (/que-ia-me-conviene/) y las fichas por herramienta,
// para que etiquetas y llaves nunca se desfasen. Las llaves de `valor` son
// las mismas de `subusos` en src/content/herramientas-ia/actual.json.
export const SUBPREGUNTAS_BASE = [
  {
    uso: 'investigacion',
    etiquetaUso: 'Investigación',
    pregunta: '¿Qué tipo de investigación?',
    opciones: [
      { valor: 'papers', etiqueta: 'Papers académicos con citas verificables', corta: 'Papers' },
      { valor: 'documentos', etiqueta: 'Solo con mis propios documentos', corta: 'Tus documentos' },
      { valor: 'web', etiqueta: 'Información actual de la web', corta: 'Web actual' },
    ],
  },
  {
    uso: 'imagenes',
    etiquetaUso: 'Imágenes',
    pregunta: '¿Qué necesitas de las imágenes?',
    opciones: [
      { valor: 'vector', etiqueta: 'Vector editable (logos, íconos)', corta: 'Vector' },
      { valor: 'comercial', etiqueta: 'Modelo entrenado con material licenciado', corta: 'Material licenciado' },
    ],
  },
  {
    uso: 'video',
    etiquetaUso: 'Video',
    pregunta: '¿Qué tipo de video?',
    opciones: [
      { valor: 'generar', etiqueta: 'Generar clips desde texto o imagen', corta: 'Generar clips' },
      { valor: 'avatar', etiqueta: 'Avatar que habla, con doblaje a otros idiomas', corta: 'Avatar y doblaje' },
      { valor: 'clips', etiqueta: 'Recortar clips de un video largo', corta: 'Recorte de clips' },
    ],
  },
] as const;
