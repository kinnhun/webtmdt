const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/data/products.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Remove size
content = content.replace(/\s*size:\s*"[^"]+",\n/g, '\n');

// Add collection if missing. We will just add it after code
const codeRegex = /(code:\s*"[^"]+",)\n(?!\s*collection:)/g;
content = content.replace(codeRegex, '$1\n    collection: "Outdoor",\n    moq: "50-100",\n');

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Fixed products.ts');
