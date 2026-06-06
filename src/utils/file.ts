export function getFontFormat(file: string): string {
  const ext = file.substring(file.lastIndexOf(".")).toLowerCase();
  if (ext === ".otf") return "opentype";
  if (ext === ".ttf") return "truetype";
  if (ext === ".woff2") return "woff2";
  if (ext === ".woff") return "woff";
  return "";
}
