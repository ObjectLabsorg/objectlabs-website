// templates/BaseTemplate.js
class BaseTemplate {
    constructor() {
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
        this.author = process.env.AUTHOR_NAME || 'Object Labs';
    }

    validate() {
        // Basic validation all content must pass
        if (!this.title) throw new Error('Content must have a title');
        if (!this.content) throw new Error('Content cannot be empty');
        return true;
    }
}

// templates/BlogTemplate.js
class BlogPost extends BaseTemplate {
    constructor(data) {
        super();
        this.type = 'blog';
        this.title = data.title;
        this.summary = data.summary;
        this.content = data.content;
        this.tags = data.tags || [];
        this.category = data.category;
        this.readingTime = this.calculateReadingTime();
    }

    calculateReadingTime() {
        const wordsPerMinute = 200;
        const words = this.content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    }

    toHTML() {
        return `
            <article class="blog-post">
                <header class="post-header">
                    <h1>${this.title}</h1>
                    <div class="post-meta">
                        <span class="author">${this.author}</span>
                        <span class="date">${new Date(this.createdAt).toLocaleDateString()}</span>
                        <span class="reading-time">${this.readingTime} min read</span>
                    </div>
                </header>
                <div class="post-content">
                    ${this.content}
                </div>
                <footer class="post-footer">
                    <div class="tags">
                        ${this.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </footer>
            </article>
        `;
    }
}

// templates/CourseTemplate.js
class Course extends BaseTemplate {
    constructor(data) {
        super();
        this.type = 'course';
        this.title = data.title;
        this.description = data.description;
        this.level = data.level;
        this.modules = data.modules || [];
        this.duration = data.duration;
        this.prerequisites = data.prerequisites || [];
        this.objectives = data.objectives || [];
    }

    toHTML() {
        return `
            <div class="course">
                <header class="course-header">
                    <h1>${this.title}</h1>
                    <div class="course-meta">
                        <span class="level">${this.level}</span>
                        <span class="duration">${this.duration}</span>
                    </div>
                </header>
                <section class="course-description">
                    ${this.description}
                </section>
                <section class="course-modules">
                    ${this.modules.map(module => `
                        <div class="module">
                            <h3>${module.title}</h3>
                            <p>${module.description}</p>
                        </div>
                    `).join('')}
                </section>
            </div>
        `;
    }
}

// Usage example for creating new content
const newBlogPost = new BlogPost({
    title: "Introduction to 3D Printing",
    summary: "Learn the basics of 3D printing technology",
    content: "Detailed content here...",
    tags: ["3D Printing", "Beginner", "Technology"],
    category: "Engineering"
});