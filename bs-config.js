// Install live preview tools
//npm install -g browser-sync

// Create a development configuration
// Save as bs-config.js
module.exports = {
    files: [
        './**/*.{html,css,js}',  // Watch all web files
        './content/**/*.md'      // Watch markdown content
    ],
    server: {
        baseDir: './',
        directory: true
    },
    notify: false,
    open: false
};

// Start development server
// browser-sync start --config bs-config.js