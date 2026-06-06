export function hexToRgbStr(hex: string): string {
  const cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length !== 6 && cleanHex.length !== 3) {
    return "";
  }

  let rStr = "";
  let gStr = "";
  let bStr = "";

  if (cleanHex.length === 6) {
    rStr = cleanHex.substring(0, 2);
    gStr = cleanHex.substring(2, 4);
    bStr = cleanHex.substring(4, 6);
  } else {
    rStr = cleanHex[0] + cleanHex[0];
    gStr = cleanHex[1] + cleanHex[1];
    bStr = cleanHex[2] + cleanHex[2];
  }

  const r = parseInt(rStr, 16);
  const g = parseInt(gStr, 16);
  const b = parseInt(bStr, 16);

  return isNaN(r) || isNaN(g) || isNaN(b) ? "" : `${r} ${g} ${b}`;
}
