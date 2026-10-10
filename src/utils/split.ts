export function splitWords(text: string, className = 'split-word'): string {
  return text
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return part
      return `<span class="${className}"><span class="split-word__inner">${part}</span></span>`
    })
    .join('')
}

export function splitLinesHtml(lines: string[], className = 'split-line'): string {
  return lines
    .map(
      (line) =>
        `<span class="${className}"><span class="split-line__inner">${line}</span></span>`,
    )
    .join('')
}
