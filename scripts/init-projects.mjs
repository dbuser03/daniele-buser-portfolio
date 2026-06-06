import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const PROJECTS_FILE = path.join(process.cwd(), "src/constants/projects.ts");
const PROJECTS_COMPONENTS_DIR = path.join(
  process.cwd(),
  "src/components/projects",
);
const PUBLIC_FONTS_DIR = path.join(process.cwd(), "public/fonts");

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function resolveImport(importPath, currentFile, projectSrcDir) {
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

  // Cerca con estensioni
  for (const ext of extensions) {
    const withExt = resolvedPath + ext;
    if (fs.existsSync(withExt)) {
      return withExt;
    }
  }

  return null;
}

function traceDependencies(entryFile, projectSrcDir) {
  const visited = new Set();
  const queue = [entryFile];

  while (queue.length > 0) {
    const currentFile = queue.shift();
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
      console.warn(
        `[init-projects] Errore nel tracciamento dipendenze di ${currentFile}:`,
        e.message,
      );
    }
  }

  return Array.from(visited);
}

function makeImportsRelative(content, fileRelativePath, id) {
  const prefix = `@/components/projects/${id}-components/`;
  const currentDir = path.dirname(fileRelativePath);

  return content.replace(
    /(from\s+["']|import\s*\(\s*["'])(@\/components\/projects\/[^"']+-components\/)([^"']+)["']/g,
    (match, p1, p2, p3) => {
      let relPath = path.relative(currentDir, p3);
      if (!relPath.startsWith(".")) {
        relPath = "./" + relPath;
      }
      return `${p1}${relPath}"`;
    },
  );
}

function init() {
  if (!fs.existsSync(PROJECTS_FILE)) {
    console.warn(
      `[init-projects] File progetti non trovato a: ${PROJECTS_FILE}`,
    );
    return;
  }

  const fileContent = fs.readFileSync(PROJECTS_FILE, "utf8");
  const arrayMatch = fileContent.match(
    /export\s+const\s+PROJECTS\s*:\s*Project\[\]\s*=\s*\[([\s\S]*)\];/,
  );
  if (!arrayMatch) {
    console.warn(
      "[init-projects] Impossibile trovare l'array PROJECTS in src/constants/projects.ts",
    );
    return;
  }

  const arrayContent = arrayMatch[1];
  const projectsBlocks = [];

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
          projectsBlocks.push(currentBlock);
          currentBlock = "";
        }
      }
    }
  }

  for (const block of projectsBlocks) {
    const idMatch = block.match(/id\s*:\s*["']([^"']+)["']/);
    if (!idMatch) continue;
    const id = idMatch[1];

    const colorsMatch = block.match(/brandingColors\s*:\s*\[([\s\S]*?)\]/);
    if (colorsMatch) {
      const colorsContent = colorsMatch[1];
      const colorObjects = colorsContent.match(/\{[\s\S]*?\}/g) || [];
      for (const colorObjStr of colorObjects) {
        const hexMatch = colorObjStr.match(/hex\s*:\s*["']([^"']+)["']/);
        const pantoneMatch = colorObjStr.match(
          /pantone\s*:\s*["']([^"']+)["']/,
        );
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
      }
    } else {
      throw new Error(
        `[init-projects] Progetto '${id}': Campo 'brandingColors' mancante.`,
      );
    }

    const hasCustomComponents = /hasCustomComponents\s*:\s*true/.test(block);
    const hasCoolShit = /hasCoolShit\s*:\s*true/.test(block);

    const projectPublicDir = path.join(process.cwd(), "public/projects", id);
    const projectPublicFontsDir = path.join(projectPublicDir, "fonts");

    if (!fs.existsSync(projectPublicFontsDir)) {
      fs.mkdirSync(projectPublicFontsDir, { recursive: true });
      console.log(`[init-projects] Creata cartella font pubblica per ${id}`);
    }

    if (fs.existsSync(PUBLIC_FONTS_DIR)) {
      const fontFiles = fs.readdirSync(PUBLIC_FONTS_DIR);
      for (const fontFile of fontFiles) {
        const srcFont = path.join(PUBLIC_FONTS_DIR, fontFile);
        const destFont = path.join(projectPublicFontsDir, fontFile);
        if (!fs.existsSync(destFont)) {
          fs.copyFileSync(srcFont, destFont);
        }
      }
    }

    if (hasCustomComponents) {
      const projectSrcDir = path.join(
        PROJECTS_COMPONENTS_DIR,
        `${id}-components`,
      );
      if (!fs.existsSync(projectSrcDir)) {
        fs.mkdirSync(projectSrcDir, { recursive: true });
        console.log(
          `[init-projects] Creata cartella sorgente: ${projectSrcDir}`,
        );
      }

      const subdirs = ["components", "hooks", "constants", "utils"];
      for (const subdir of subdirs) {
        const subdirPath = path.join(projectSrcDir, subdir);
        if (!fs.existsSync(subdirPath)) {
          fs.mkdirSync(subdirPath, { recursive: true });
        }
      }

      const colors = [];
      const colorsMatch = block.match(/brandingColors\s*:\s*\[([\s\S]*?)\]/);
      if (colorsMatch) {
        const colorsContent = colorsMatch[1];
        const colorObjects = colorsContent.match(/\{[\s\S]*?\}/g) || [];
        for (const colorObjStr of colorObjects) {
          const hexMatch = colorObjStr.match(/hex\s*:\s*["']([^"']+)["']/);
          if (hexMatch) {
            colors.push(hexMatch[1]);
          }
        }
      }

      if (colors.length > 0) {
        let cssContent = `/* Auto-generated theme for ${id} */
.project-theme-${id} {
`;
        colors.forEach((hex, idx) => {
          cssContent += `  --project-color-${idx}: ${hex};\n`;
        });

        const bg = colors[0];
        const cardDark = colors[1] || bg;
        const foreground = colors[colors.length - 1];
        const neutralDark = colors.length >= 3 ? colors[2] : cardDark;
        const neutral = colors.length >= 4 ? colors[3] : foreground;
        const accent = colors.length >= 5 ? colors[2] : colors[1] || foreground;

        cssContent += `
  --background: ${bg};
  --foreground: ${foreground};
  --card-dark: ${cardDark};
  --neutral-dark: ${neutralDark};
  --neutral: ${neutral};
  --accent: ${accent};
}
`;
        const themeCssPath = path.join(projectSrcDir, "theme.css");
        fs.writeFileSync(themeCssPath, cssContent, "utf8");
        console.log(`[init-projects] Creato/Aggiornato theme.css per ${id}`);
      }

      const uiFilePath = path.join(projectSrcDir, `${id}-UI.tsx`);
      if (!fs.existsSync(uiFilePath)) {
        const boilerplate = `"use client";

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
`;
        fs.writeFileSync(uiFilePath, boilerplate, "utf8");
        console.log(`[init-projects] Creato UI boilerplate per ${id}`);
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
          entryFile = path.join(projectSrcDir, `components/${coolShitName}.ts`);
        }

        if (fs.existsSync(entryFile)) {
          const filesToCopy = traceDependencies(entryFile, projectSrcDir);

          for (const file of filesToCopy) {
            const isEntry = file === entryFile;

            let destRelativePath = "";
            if (isEntry) {
              destRelativePath = `${coolShitName}${path.extname(file)}`; 
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
            console.warn(
              `[init-projects] Impossibile creare l'archivio zip per ${id}:`,
              err.message,
            );
          }
        } else {
          console.warn(
            `[init-projects] Componente ${coolShitName} non trovato a: ${entryFile}`,
          );
        }
      }
    }
  }
}

init();
