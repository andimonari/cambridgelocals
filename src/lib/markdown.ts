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
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm font-mono">$1</code>')
    .replace(
      /\[(.+?)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" class="text-indigo-600 hover:underline" rel="noopener noreferrer" target="_blank">$1</a>',
    )
}

export function renderMarkdown(raw: string): string {
  const lines = raw.split("\n")
  const out: string[] = []
  let inList = false

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (inList) { out.push("</ul>"); inList = false }
      out.push(`<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-2">${inline(line.slice(4))}</h3>`)
    } else if (line.startsWith("## ")) {
      if (inList) { out.push("</ul>"); inList = false }
      out.push(`<h2 class="text-xl font-bold text-gray-900 mt-8 mb-3">${inline(line.slice(3))}</h2>`)
    } else if (line.startsWith("# ")) {
      if (inList) { out.push("</ul>"); inList = false }
      out.push(`<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-3">${inline(line.slice(2))}</h1>`)
    } else if (/^[-*] /.test(line)) {
      if (!inList) { out.push('<ul class="list-disc list-inside space-y-1 my-4 text-gray-700">'); inList = true }
      out.push(`<li>${inline(line.slice(2))}</li>`)
    } else if (line.trim() === "") {
      if (inList) { out.push("</ul>"); inList = false }
    } else {
      if (inList) { out.push("</ul>"); inList = false }
      out.push(`<p class="text-gray-700 leading-relaxed mb-4">${inline(line)}</p>`)
    }
  }

  if (inList) out.push("</ul>")
  return out.join("\n")
}
