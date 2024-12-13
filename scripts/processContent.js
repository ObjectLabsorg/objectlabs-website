// scripts/processContent.js
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

async function processContent() {
    // Get all content files
    const contentDir = path.join(process.cwd(), 'content');
    const files = await fs.readdir(contentDir);
    
    // Process each file
    for (const file of files) {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        // Parse frontmatter and content
        const { data, content: markdown } = matter(content);
        
        // Convert markdown to HTML
        const html = marked(markdown);
        
        // Create the appropriate template based on content type
        let template;
        if (data.type === 'blog') {
            template = new BlogPost({
                ...data,
                content: html
            });
        } else if (data.type === 'course') {
            template = new Course({
                ...data,
                content: html
            });
        }
        
        // Validate and save
        if (template.validate()) {
            await saveProcessedContent(template);
        }
    }
}

async function saveProcessedContent(template) {
    const outputDir = path.join(process.cwd(), 'dist', template.type);
    await fs.mkdir(outputDir, { recursive: true });
    
    const outputPath = path.join(outputDir, `${template.title.toLowerCase().replace(/\s+/g, '-')}.html`);
    await fs.writeFile(outputPath, template.toHTML());
}

module.exports = { processContent };