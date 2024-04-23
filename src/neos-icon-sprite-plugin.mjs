import { promises as fs } from 'fs';
import path from 'path';
import { optimize } from 'svgo';

// creates a SVG sprite from the SVG files in the
export default function NeosIconSpritePlugin({
    basePackageName,
    inputDir = 'Resources/Private/Icons',
    outputDir = 'Resources/Public/Dist',
    outputName = 'spritemap.svg',
    prefix = '',
    disableSVGO = false,
    svgoConfig = {},
}) {
    if (!basePackageName) {
        throw new Error('You must provide the Neos base package name');
    }

    async function generateIconSprite() {
        const iconsDir = path.resolve(process.cwd(), '../', basePackageName, inputDir);
        const files = await fs.readdir(iconsDir);
        let symbols = '';

        // Build up the SVG sprite from the SVG files
        for (const file of files) {
            if (!file.endsWith('.svg')) continue;
            let svgContent = await fs.readFile(path.join(iconsDir, file), 'utf8');

            svgContent = disableSVGO ? svgContent : optimize(svgContent, svgoConfig).data;

            const id = prefix + file.replace('.svg', '');
            svgContent = svgContent
                .replace(/id="[^"]+"/, '') // Remove any existing id
                .replace('<svg', `<symbol id="${id}"`) // Change <svg> to <symbol>
                .replace('</svg>', '</symbol>');
            symbols += svgContent + '\n';
        }

        const sprite = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\n
            ${symbols}
        </svg>`;
        await fs.writeFile(path.join(process.cwd(), outputDir, outputName), sprite);
    }

    return {
        name: 'neos-vite-sprite-map-plugin',
        buildStart() {
            // Generate during build
            return generateIconSprite();
        },
        configureServer(server) {
            // Regenerate during development whenever an icon is added
            server.watcher.add(path.join(process.cwd(), '../', basePackageName, inputDir, '*.svg'));
            server.watcher.on('change', async changedPath => {
                if (changedPath.endsWith('.svg')) return generateIconSprite();
            });
        },
    };
}
