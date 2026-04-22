export function normalizeImageSource(value) {
  if (typeof value !== "string") return "";
  const src = value.trim();
  if (!src) return "";
  if (src.startsWith("data:image/")) return src;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return src;
  return "";
}

export function resolveImageSource(value, fallback) {
  const primary = normalizeImageSource(value);
  if (primary) return primary;
  return normalizeImageSource(fallback);
}
