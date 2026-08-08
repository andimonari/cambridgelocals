function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function inline(s: string): string {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-surface px-1.5 py-0.5 rounded-md text-sm font-mono">$1</code>')
    .replace(
      /\[(.+?)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" class="text-accent hover:underline" rel="noopener noreferrer" target="_blank">$1</a>',
    )
}

export function renderMarkdown(raw: string): string {
  const lines = raw.split("\n")
  const out: string[] = []
  let inList = false

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (inList) { out.push("</ul>"); inList = false }
      out.push(`<h3 class="text-lg font-semibold text-foreground tracking-tight mt-7 mb-2">${inline(line.slice(4))}</h3>`)
    } else if (line.startsWith("## ")) {
      if (inList) { out.push("</ul>"); inList = false }
      out.push(`<h2 class="text-2xl font-semibold text-foreground tracking-tight mt-10 mb-3">${inline(line.slice(3))}</h2>`)
    } else if (line.startsWith("# ")) {
      if (inList) { out.push("</ul>"); inList = false }
      out.push(`<h1 class="text-3xl font-semibold text-foreground tracking-tight mt-10 mb-3">${inline(line.slice(2))}</h1>`)
    } else if (/^[-*] /.test(line)) {
      if (!inList) { out.push('<ul class="list-disc list-inside space-y-1.5 my-5 text-foreground/80">'); inList = true }
      out.push(`<li>${inline(line.slice(2))}</li>`)
    } else if (line.trim() === "") {
      if (inList) { out.push("</ul>"); inList = false }
    } else {
      if (inList) { out.push("</ul>"); inList = false }
      out.push(`<p class="text-foreground/80 leading-relaxed mb-5">${inline(line)}</p>`)
    }
  }

  if (inList) out.push("</ul>")
  return out.join("\n")
}
