const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/data/products.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Replacements for MOQ
content = content.replace(/"moq": "50–200 units"/g, '"moq": "50–100"');
content = content.replace(/"moq": "< 50 units"/g, '"moq": "10–50"');
content = content.replace(/"moq": "200–500 units"/g, '"moq": "100+"');
content = content.replace(/"moq": "500\+ units"/g, '"moq": "100+"');

// Replacements for Colors
content = content.replace(/"color": "Walnut Brown"/g, '"color": "Brown"');
content = content.replace(/"color": "Warm Beige"/g, '"color": "Beige"');
content = content.replace(/"color": "Ivory White"/g, '"color": "White"');
content = content.replace(/"color": "Charcoal Grey"/g, '"color": "Grey"');
content = content.replace(/"color": "Deep Navy"/g, '"color": "Black"');

// Replacements for Styles
content = content.replace(/"style": "Scandinavian"/g, '"style": "Minimalist"');
content = content.replace(/"style": "Mid-Century Modern"/g, '"style": "Modern"');
content = content.replace(/"style": "Industrial"/g, '"style": "Modern"');

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Update complete');
