import path from 'path';
import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import Handlebars from 'handlebars';

export async function paged() {
    const configText = await readFile(new URL('./config.json', import.meta.url));
    const config = JSON.parse(configText);
    console.log(config.title);
    if (config.dest && !existsSync(config.dest)) {
        await mkdir(config.dest, { recursive: true });
    }
    const cache = {};
    return Promise.all((config.files || [])
        .filter(file => file.filename)
        .filter(file => config.template || file.template)
        .map(async (file) => {
            console.log(`creating ${file.filename}...`);
            const template = file.template || config.template || 'template.html';
            if (!cache[template]) {
                cache[template] = Handlebars.compile(await readFile(new URL(template, import.meta.url), 'utf-8'));
            }
            await writeFile(new URL(path.join(config.dest, file.filename), import.meta.url), cache[template](file.data), 'utf-8');
        }));
}

paged();
