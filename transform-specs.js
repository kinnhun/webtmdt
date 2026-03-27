const fs = require('fs');
const file = 'd:/nemark/web thuong mai dien tu/webtmdt/src/data/products.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/specifications:\s*\{([^}]+)\}/g, (match, inner) => {
  const lines = inner.split('\n');
  const items = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Check for "Key": "Value" pattern
    const pair = trimmed.match(/"([^"]+)"\s*:\s*"([^"]+)"/);
    if (pair) {
      items.push(`      { nameUS: "${pair[1]}", valueUS: "${pair[2]}" }`);
    }
  }
  return 'specifications: [\n' + items.join(',\n') + '\n    ]';
});

fs.writeFileSync(file, content);
console.log('Successfully updated specifications in ' + file);
