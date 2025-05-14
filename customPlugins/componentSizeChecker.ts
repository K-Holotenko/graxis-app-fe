import fs from 'fs';
import path from 'path';
import colors from 'picocolors';
import { Plugin } from 'vite';

interface ComponentSizeCheckerOptions {
  include?: string[];
  maxLines?: number;
  maxSizeKb?: number;
}

export function componentSizeChecker(
  options: ComponentSizeCheckerOptions = {}
): Plugin {
  const { include = ['src'], maxLines = 500, maxSizeKb = 50 } = options;

  return {
    name: 'vite-plugin-component-size-checker',
    apply: 'build',
    buildStart() {
      // eslint-disable-next-line no-console
      console.log(colors.cyan('[Component Size Checker] Running checks...'));

      const targetExtensions = ['.tsx', '.jsx'];
      const rootDir = process.cwd();

      const getAllFiles = (dirPath: string): string[] => {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        const files = entries.flatMap((entry) => {
          const fullPath = path.join(dirPath, entry.name);

          return entry.isDirectory() ? getAllFiles(fullPath) : fullPath;
        });

        return files;
      };

      for (const folder of include) {
        const fullFolderPath = path.join(rootDir, folder);

        if (!fs.existsSync(fullFolderPath)) continue;

        const files = getAllFiles(fullFolderPath).filter((f) =>
          targetExtensions.includes(path.extname(f))
        );

        for (const file of files) {
          const content = fs.readFileSync(file, 'utf-8');
          const lines = content.split('\n').length;
          const sizeKb = Buffer.byteLength(content) / 1024;

          const relativePath = path.relative(rootDir, file);

          if (lines > maxLines || sizeKb > maxSizeKb) {
            // eslint-disable-next-line no-console
            console.warn(
              colors.yellow(
                `\n⚠️  Component too large: ${relativePath}\n` +
                  `   • ${lines} lines (max: ${maxLines})\n` +
                  `   • ${sizeKb.toFixed(2)} KB (max: ${maxSizeKb} KB)\n`
              )
            );
          }
        }
      }
    },
  };
}
