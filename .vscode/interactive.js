// content-templates/blog-post.js
module.exports = {
    title: '',
    date: new Date().toISOString(),
    author: 'Your Name',
    category: '',
    tags: [],
    content: '',
    template: `
# [Title]

## Overview
[Overview content]

## Main Content
[Main content]

## Conclusion
[Conclusion content]
    `
};