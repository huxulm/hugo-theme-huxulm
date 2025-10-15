import { readFile } from 'fs/promises';
import * as pgfd from "pagefind";
import { resolve } from 'path';

// Create a Pagefind search index to work with
const { index } = await pgfd.createIndex({
    forceLanguage: 'zh', // 设置强制语言为中文
    languages: ['zh', 'en'] // 支持中文和英文
});

// Index hugo generated json file
const content_path = "./exampleSite/public/index.json";

try {
    // Read JSON file using fs/promises
    const jsonContent = await readFile(resolve(content_path), 'utf8');
    const pages = JSON.parse(jsonContent);
    
    console.log(`Found ${pages.length} pages to index from ${content_path}`);
    
    // Index each page
    for (const page of pages) {
        console.log(`Indexing: ${page.title} (${page.url}) - ${page.wordCount} words`);
        
        await index.addHTMLFile({
            url: page.url,
            content: `<html><head><title>${page.title}</title></head><body>${page.content}</body></html>`,
            meta: {
                title: page.title,
                summary: page.summary,
                section: page.section,
                type: page.type,
                date: page.date,
                lastmod: page.lastmod,
                uid: page.uid,
                tags: page.tags?.join(', ') || '',
                categories: page.categories?.join(', ') || '',
                readingTime: page.readingTime,
                wordCount: page.wordCount
            }
        });
    }
    
    console.log(`Successfully indexed ${pages.length} pages`);
    
} catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    console.error('Make sure Hugo has generated the index.json file first');
    process.exit(1);
}

// Write the index to disk
await index.writeFiles({
    outputPath: "./exampleSite/public/pagefind"
});