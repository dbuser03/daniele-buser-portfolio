import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { toKebabCase } from "../src/utils/string";
import { escapeRegex } from "../src/utils/regex";
import { getFontFormat } from "../src/utils/file";

interface FontWeight {
  name: string;
  value: string;
  file: string | null;
}

interface ParsedFont {
  name: string;
  familyVarName: string;
  type: string;
  weights: FontWeight[];
}

interface ParsedColor {
  hex: string;
  pantone: string;
  rgb: string | null;
}

const PROJECTS_FILE = path.join(process.cwd(), "src/constants/projects.ts");
const PROJECTS_COMPONENTS_DIR = path.join(
  process.cwd(),
  "src/components/projects",
);

function resolveImport(
  importPath: string,
  currentFile: string,
  projectSrcDir: string,
): string | null {
  let resolvedPath = "";

  if (importPath.startsWith("@/")) {
    const idComponentsPrefix = `@/components/projects/${path.basename(projectSrcDir)}/`;
    if (importPath.startsWith(idComponentsPrefix)) {
      resolvedPath = path.join(
        projectSrcDir,
        importPath.substring(idComponentsPrefix.length),
      );
    } else {
      resolvedPath = path.join(process.cwd(), "src", importPath.substring(2));
    }
  } else if (importPath.startsWith(".") || importPath.startsWith("..")) {
    resolvedPath = path.resolve(path.dirname(currentFile), importPath);
  } else {
    return null;
  }

  const extensions = [
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".svg",
    ".json",
    ".css",
  ];

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    for (const ext of extensions) {
      const indexPath = path.join(resolvedPath, "index" + ext);
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }
  }

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    return resolvedPath;
  }

  for (const ext of extensions) {
    const withExt = resolvedPath + ext;
    if (fs.existsSync(withExt)) {
      return withExt;
    }
  }

  return null;
}

function traceDependencies(
  entryFile: string,
  projectSrcDir: string,
): string[] {
  const visited = new Set<string>();
  const queue: string[] = [entryFile];

  while (queue.length > 0) {
    const currentFile = queue.shift()!;
    if (visited.has(currentFile)) continue;
    visited.add(currentFile);

    try {
      const content = fs.readFileSync(currentFile, "utf8");

      const importRegex =
        /(?:import|export)\s+[\s\S]*?\s+from\s+["']([^"']+)["']/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolved = resolveImport(importPath, currentFile, projectSrcDir);
        if (
          resolved &&
          resolved.startsWith(projectSrcDir) &&
          !visited.has(resolved)
        ) {
          queue.push(resolved);
        }
      }

      const dynamicImportRegex = /import\s*\(\s*["']([^"']+)["']\s*\)/g;
      while ((match = dynamicImportRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolved = resolveImport(importPath, currentFile, projectSrcDir);
        if (
          resolved &&
          resolved.startsWith(projectSrcDir) &&
          !visited.has(resolved)
        ) {
          queue.push(resolved);
        }
      }
    } catch (e) {
      const err = e as Error;
      console.warn(
        `[init-projects] Errore nel tracciamento dipendenze di ${currentFile}:`,
        err.message,
      );
    }
  }

  return Array.from(visited);
}

function makeImportsRelative(
  content: string,
  fileRelativePath: string,
  id: string,
): string {
  const prefix = `@/components/projects/${id}/`;
  const escapedPrefix = escapeRegex(prefix);
  const currentDir = path.dirname(fileRelativePath);

  return content.replace(
    new RegExp(
      `(from\\s+["']|import\\s*\\(\\s*["'])${escapedPrefix}([^"']+)["']`,
      "g",
    ),
    (match, p1, p2) => {
      let relPath = path.relative(currentDir, p2);
      if (!relPath.startsWith(".")) {
        relPath = "./" + relPath;
      }
      return `${p1}${relPath}"`;
    },
  );
}

function extractProjectBlocks(fileContent: string): string[] {
  const arrayMatch = fileContent.match(
    /export\s+const\s+PROJECTS\s*:\s*Project\[\]\s*=\s*\[([\s\S]*)\];/,
  );
  if (!arrayMatch) {
    return [];
  }

  const arrayContent = arrayMatch[1];
  const blocks: string[] = [];
  let braceCount = 0;
  let currentBlock = "";
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];

    if (
      (char === '"' || char === "'" || char === "`") &&
      arrayContent[i - 1] !== "\\"
    ) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === "{") {
        braceCount++;
      }
    }

    if (braceCount > 0) {
      currentBlock += char;
    }

    if (!inString) {
      if (char === "}") {
        braceCount--;
        if (braceCount === 0) {
          blocks.push(currentBlock);
          currentBlock = "";
        }
      }
    }
  }

  return blocks;
}

function parseProjectColors(block: string, id: string): ParsedColor[] {
  const colorsMatch = block.match(/brandingColors\s*:\s*\[([\s\S]*?)\]/);
  if (!colorsMatch) {
    throw new Error(
      `[init-projects] Progetto '${id}': Campo 'brandingColors' mancante.`,
    );
  }

  const colorsContent = colorsMatch[1];
  const colorObjects = colorsContent.match(/\{[\s\S]*?\}/g) || [];
  const parsedColors: ParsedColor[] = [];

  for (const colorObjStr of colorObjects) {
    const hexMatch = colorObjStr.match(/hex\s*:\s*["']([^"']+)["']/);
    const pantoneMatch = colorObjStr.match(/pantone\s*:\s*["']([^"']+)["']/);
    const rgbMatch = colorObjStr.match(/rgb\s*:\s*["']([^"']+)["']/);

    if (!hexMatch) {
      throw new Error(
        `[init-projects] Progetto '${id}': Colore mancante del campo obbligatorio 'hex'.`,
      );
    }
    if (!pantoneMatch) {
      throw new Error(
        `[init-projects] Progetto '${id}': Colore mancante del campo obbligatorio 'pantone'.`,
      );
    }

    const hex = hexMatch[1];
    const pantone = pantoneMatch[1];
    const rgb = rgbMatch ? rgbMatch[1] : null;

    const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (!hexRegex.test(hex)) {
      throw new Error(
        `[init-projects] Progetto '${id}': Colore HEX '${hex}' non valido. Deve iniziare con # e contenere 3 o 6 caratteri esadecimali.`,
      );
    }

    const pantoneRegex =
      /^(?:(?:[A-Za-z\s]+)?\d{1,5}\s+[A-Za-z]{1,3}|[A-Za-z\s]+\s+[A-Z]{1,3}|\d{2}-\d{4}\s+[A-Z]{2,3})$/i;
    if (!pantoneRegex.test(pantone)) {
      throw new Error(
        `[init-projects] Progetto '${id}': Codice Pantone '${pantone}' non valido. Esempi validi: 'Black 6 C', '7527 C', 'White C', '18-1663 TCX'.`,
      );
    }

    if (rgb) {
      const rgbRegex =
        /^(?:rgb\()?\s*(25[0-5]|2[0-4]\d|[01]?\d?\d)\s*[\s,]\s*(25[0-5]|2[0-4]\d|[01]?\d?\d)\s*[\s,]\s*(25[0-5]|2[0-4]\d|[01]?\d?\d)\s*\)?$/i;
      if (!rgbRegex.test(rgb)) {
        throw new Error(
          `[init-projects] Progetto '${id}': Valore RGB '${rgb}' non valido. Formati supportati: '255 255 255' o '255, 255, 255'.`,
        );
      }
    }

    parsedColors.push({ hex, pantone, rgb });
  }

  return parsedColors;
}

function parseProjectFonts(block: string): ParsedFont[] {
  const startMatch = block.match(/brandingFonts\s*:\s*\[/);
  if (!startMatch) {
    return [];
  }

  const startIdx = startMatch.index! + startMatch[0].length;
  let bracketCount = 1;
  let inString = false;
  let stringChar = "";
  let endIdx = startIdx;

  for (let i = startIdx; i < block.length; i++) {
    const char = block[i];
    if (
      (char === '"' || char === "'" || char === "`") &&
      block[i - 1] !== "\\"
    ) {
      if (!inString) {
        inString = true;
        stringChar = char;
        continue;
      }
      if (char === stringChar) {
        inString = false;
        continue;
      }
    }
    if (!inString) {
      if (char === "[") bracketCount++;
      if (char === "]") {
        bracketCount--;
        if (bracketCount === 0) {
          endIdx = i;
          break;
        }
      }
    }
  }

  const fontsContent = block.substring(startIdx, endIdx);
  const fontObjects: string[] = [];

  let braceCount = 0;
  let currentObj = "";
  inString = false;
  stringChar = "";

  for (let i = 0; i < fontsContent.length; i++) {
    const char = fontsContent[i];
    if (
      (char === '"' || char === "'" || char === "`") &&
      fontsContent[i - 1] !== "\\"
    ) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }
    if (!inString) {
      if (char === "{") braceCount++;
    }
    if (braceCount > 0) {
      currentObj += char;
    }
    if (!inString) {
      if (char === "}") {
        braceCount--;
        if (braceCount === 0) {
          fontObjects.push(currentObj);
          currentObj = "";
        }
      }
    }
  }

  const parsedFonts: ParsedFont[] = [];

  for (const fontObjStr of fontObjects) {
    const nameMatch = fontObjStr.match(/name\s*:\s*["']([^"']+)["']/);
    const familyVarMatch = fontObjStr.match(/familyVar\s*:\s*["']([^"']+)["']/);
    const typeMatch = fontObjStr.match(/type\s*:\s*["']([^"']+)["']/);

    if (!nameMatch) continue;
    const name = nameMatch[1];
    const familyVarRaw = familyVarMatch ? familyVarMatch[1] : "";
    const familyVarName = familyVarRaw.match(/var\(([^)]+)\)/)
      ? familyVarRaw.match(/var\(([^)]+)\)/)![1]
      : "";
    const type = typeMatch ? typeMatch[1] : "sans";

    const weightsMatch = fontObjStr.match(/weights\s*:\s*\[([\s\S]*?)\]/);
    const weights: FontWeight[] = [];
    if (weightsMatch) {
      const weightsContent = weightsMatch[1];
      const weightObjects = weightsContent.match(/\{[\s\S]*?\}/g) || [];
      for (const wObjStr of weightObjects) {
        const wNameMatch = wObjStr.match(/name\s*:\s*["']([^"']+)["']/);
        const wValueMatch = wObjStr.match(/value\s*:\s*([0-9a-zA-Z]+)/);
        const wFileMatch = wObjStr.match(/file\s*:\s*["']([^"']+)["']/);

        if (wNameMatch && wValueMatch) {
          weights.push({
            name: wNameMatch[1],
            value: wValueMatch[1],
            file: wFileMatch ? wFileMatch[1] : null,
          });
        }
      }
    }

    parsedFonts.push({
      name,
      familyVarName,
      type,
      weights,
    });
  }

  return parsedFonts;
}

function generateThemeCss(
  id: string,
  colors: ParsedColor[],
  fonts: ParsedFont[],
): string {
  let cssContent = '@import "tailwindcss";\n\n';

  fonts.forEach((font) => {
    font.weights.forEach((weight) => {
      if (weight.file) {
        const format = getFontFormat(weight.file);
        const formatStr = format ? ` format('${format}')` : "";
        cssContent += `@font-face {
  font-family: '${font.name}';
  src: url('/projects/${id}/fonts/${weight.file}')${formatStr};
  font-weight: ${weight.value};
  font-style: normal;
  font-display: swap;
}

`;
      }
    });
  });

  cssContent += `.project-theme-${id} {
  --background: ${colors[0].hex};
  --neutral-dark: ${colors.length >= 2 ? colors[1].hex : colors[0].hex};
  --neutral: ${colors.length >= 3 ? colors[2].hex : colors[0].hex};
  --accent: ${colors.length >= 4 ? colors[3].hex : colors[0].hex};
  --foreground: ${colors[colors.length - 1].hex};
}
`;
  return cssContent;
}

function init(): void {
  if (!fs.existsSync(PROJECTS_FILE)) {
    console.warn(
      `[init-projects] File progetti non trovato a: ${PROJECTS_FILE}`,
    );
    return;
  }

  const fileContent = fs.readFileSync(PROJECTS_FILE, "utf8");
  const projectsBlocks = extractProjectBlocks(fileContent);

  if (projectsBlocks.length === 0) {
    console.warn(
      "[init-projects] Impossibile trovare l'array PROJECTS in src/constants/projects.ts",
    );
    return;
  }

  for (const block of projectsBlocks) {
    const idMatch = block.match(/id\s*:\s*["']([^"']+)["']/);
    if (!idMatch) continue;
    const id = idMatch[1];

    const brandingColors = parseProjectColors(block, id);
    const brandingFonts = parseProjectFonts(block);

    const hasCustomComponents = /hasCustomComponents\s*:\s*true/.test(block);
    const hasCoolShit = /hasCoolShit\s*:\s*true/.test(block);

    const projectPublicDir = path.join(process.cwd(), "public/projects", id);
    const projectPublicFontsDir = path.join(projectPublicDir, "fonts");

    if (!fs.existsSync(projectPublicFontsDir)) {
      fs.mkdirSync(projectPublicFontsDir, { recursive: true });
    }

    const projectSrcDir = path.join(PROJECTS_COMPONENTS_DIR, id);
    if (!fs.existsSync(projectSrcDir)) {
      fs.mkdirSync(projectSrcDir, { recursive: true });
      console.log(
        `[init-projects] Creata cartella sorgente: ${projectSrcDir}`,
      );
    }

    if (brandingColors.length > 0) {
      const cssContent = generateThemeCss(id, brandingColors, brandingFonts);
      const themeCssPath = path.join(projectSrcDir, "theme.css");
      fs.writeFileSync(themeCssPath, cssContent, "utf8");
      console.log(`[init-projects] Creato/Aggiornato theme.css per ${id}`);
    }

    const uiFilePath = path.join(projectSrcDir, `${id}-UI.tsx`);
    if (!fs.existsSync(uiFilePath)) {
      const uiContent = hasCustomComponents
        ? `"use client";

import "./theme.css";

export default function CustomComponentsUI() {
  return (
    <div className="project-theme-${id} flex flex-col gap-4 py-4 text-left">
      <p className="text-xs text-(--neutral) uppercase tracking-wider font-mono">
        Custom UI per ${id}
      </p>
    </div>
  );
}
`
        : `"use client";

import "./theme.css";

export default function ThemeOnly() {
  return null;
}
`;
      fs.writeFileSync(uiFilePath, uiContent, "utf8");
      console.log(`[init-projects] Creato UI file per ${id}`);
    }

    if (hasCustomComponents) {
      const subdirs = ["components", "hooks", "constants", "utils"];
      for (const subdir of subdirs) {
        const subdirPath = path.join(projectSrcDir, subdir);
        if (!fs.existsSync(subdirPath)) {
          fs.mkdirSync(subdirPath, { recursive: true });
        }
      }

      if (hasCoolShit) {
        const coolShitNameMatch = block.match(
          /coolShitName\s*:\s*["']([^"']+)["']/,
        );
        const coolShitName = coolShitNameMatch
          ? coolShitNameMatch[1]
          : "InteractiveDemo";
        const kebabName = toKebabCase(coolShitName);

        const coolShitDir = path.join(projectPublicDir, kebabName);

        if (fs.existsSync(coolShitDir)) {
          fs.rmSync(coolShitDir, { recursive: true, force: true });
        }
        const oldCoolShitDir = path.join(
          projectPublicDir,
          "cool-shit-component",
        );
        if (fs.existsSync(oldCoolShitDir)) {
          fs.rmSync(oldCoolShitDir, { recursive: true, force: true });
        }
        fs.mkdirSync(coolShitDir, { recursive: true });

        let entryFile = path.join(
          projectSrcDir,
          `components/${coolShitName}.tsx`,
        );
        if (!fs.existsSync(entryFile)) {
          entryFile = path.join(
            projectSrcDir,
            `components/${coolShitName}.ts`,
          );
        }

        if (fs.existsSync(entryFile)) {
          const filesToCopy = traceDependencies(entryFile, projectSrcDir);

          for (const file of filesToCopy) {
            const isEntry = file === entryFile;

            let destRelativePath = "";
            if (isEntry) {
              destRelativePath = `${coolShitName}${path.extname(file)}`;
            } else {
              destRelativePath = path.relative(projectSrcDir, file);
            }

            const destPath = path.join(coolShitDir, destRelativePath);
            fs.mkdirSync(path.dirname(destPath), { recursive: true });

            const ext = path.extname(file).toLowerCase();
            const textExtensions = [
              ".ts",
              ".tsx",
              ".js",
              ".jsx",
              ".json",
              ".css",
            ];

            if (textExtensions.includes(ext)) {
              let fileContent = fs.readFileSync(file, "utf8");
              fileContent = makeImportsRelative(
                fileContent,
                destRelativePath,
                id,
              );

              if (isEntry) {
                fileContent = fileContent.replace(
                  /(from\s+["']|import\s*\(\s*["'])\.\.\/([^"']+)["']/g,
                  '$1./$2"',
                );
              }

              fs.writeFileSync(destPath, fileContent, "utf8");
            } else {
              fs.copyFileSync(file, destPath);
            }
          }

          const themeCssSrc = path.join(projectSrcDir, "theme.css");
          if (fs.existsSync(themeCssSrc)) {
            fs.copyFileSync(themeCssSrc, path.join(coolShitDir, "theme.css"));
            console.log(`[init-projects] Copiato theme.css in ${coolShitDir}`);
          }

          try {
            const zipFileName = `${kebabName}.zip`;
            const zipPath = path.join(projectPublicDir, zipFileName);
            if (fs.existsSync(zipPath)) {
              fs.unlinkSync(zipPath);
            }
            execSync(`zip -r "../${zipFileName}" .`, {
              cwd: coolShitDir,
              stdio: "ignore",
            });
            console.log(`[init-projects] Creato archivio zip: ${zipPath}`);
          } catch (err) {
            const error = err as Error;
            console.warn(
              `[init-projects] Impossibile creare l'archivio zip per ${id}:`,
              error.message,
            );
          }
        } else {
          console.warn(
            `[init-projects] Componente ${coolShitName} non trovato a: ${entryFile}`,
          );
        }
      }
    }

    const subdirs = ["components", "hooks", "constants", "utils"];
    for (const subdir of subdirs) {
      const subdirPath = path.join(projectSrcDir, subdir);
      if (fs.existsSync(subdirPath)) {
        const entries = fs.readdirSync(subdirPath);
        if (entries.length === 0) {
          fs.rmdirSync(subdirPath);
          console.log(`[init-projects] Rimossa cartella vuota: ${subdirPath}`);
        }
      }
    }
  }
}

init();
