// Escribe/reemplaza campos puntuales en el frontmatter YAML de un archivo
// .md sin re-serializar el documento completo (evita que gray-matter
// reformatee bloques ya existentes que no se están tocando). Mismo patrón
// que ya usaba scripts/backfill-descriptions.mjs para un solo campo;
// generalizado aquí para escribir varios campos en una sola pasada.
import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';

export function setFrontmatterFields(filePath, fields) {
  const raw = readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') throw new Error('frontmatter no encontrado');
  let closeIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      closeIdx = i;
      break;
    }
  }
  if (closeIdx === -1) throw new Error('frontmatter no cerrado');

  let fmLines = lines.slice(1, closeIdx);

  for (const [key, value] of Object.entries(fields)) {
    const dumped = yaml.dump({ [key]: value }).replace(/\n$/, '');
    const dumpedLines = dumped.split('\n');

    const startIdx = fmLines.findIndex((l) => new RegExp(`^${key}:`).test(l));
    if (startIdx === -1) {
      fmLines = [...fmLines, ...dumpedLines];
      continue;
    }
    let endIdx = fmLines.length;
    for (let i = startIdx + 1; i < fmLines.length; i++) {
      if (/^[A-Za-z_][\w-]*:/.test(fmLines[i])) {
        endIdx = i;
        break;
      }
    }
    fmLines = [...fmLines.slice(0, startIdx), ...dumpedLines, ...fmLines.slice(endIdx)];
  }

  const newLines = ['---', ...fmLines, '---', ...lines.slice(closeIdx + 1)];
  writeFileSync(filePath, newLines.join('\n'));
}
