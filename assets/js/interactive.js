document.addEventListener('DOMContentLoaded', function() {
    // Resource Cards Component
    class ResourceCard {
        constructor(title, description, difficulty, category) {
            this.title = title;
            this.description = description;
            this.difficulty = difficulty;
            this.category = category;
        }

        render() {
            return `
                <div class="interactive-card">
                    <h3>${this.title}</h3>
                    <p>${this.description}</p>
                    <div class="card-meta">
                        <span class="difficulty ${this.difficulty.toLowerCase()}">${this.difficulty}</span>
                        <span class="category">${this.category}</span>
                    </div>
                </div>
            `;
        }
    }

    // Initialize Resources
    const resources = [
        new ResourceCard(
            "Introduction to 3D Printing",
            "Learn the basics of 3D printing technology",
            "Beginner",
            "Engineering"
        ),
        // Add more resources
    ];

    // Render resources
    const resourceContainer = document.getElementById('resource-grid');
    if (resourceContainer) {
        resources.forEach(resource => {
            resourceContainer.innerHTML += resource.render();
        });
    }
});