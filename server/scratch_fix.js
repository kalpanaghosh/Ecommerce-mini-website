const fs = require('fs');
const products = require('./productData');
const validCats = require('./valid_categorized.json');
const invalidInDb = require('./invalid_in_db.json');
const invalidIds = invalidInDb.map(url => {
  const match = url.match(/photo-([a-zA-Z0-9-]+)/);
  return match ? match[1] : null;
}).filter(x => x);

let content = fs.readFileSync('productData.js', 'utf8');

// Collect currently used IDs
const usedIds = new Set();
products.forEach(p => {
  const match = p.image.match(/photo-([a-zA-Z0-9-]+)/);
  if(match && !invalidIds.includes(match[1])) {
    usedIds.add(match[1]);
  }
});

// Create a fallback pool of ALL valid IDs
const allValidPool = [];
for (const cat in validCats) {
  allValidPool.push(...validCats[cat]);
}

let replacements = 0;

for (let invalidId of invalidIds) {
  const product = products.find(p => p.image.includes(invalidId));
  if (!product) continue;
  
  // check if it's already replaced in content (if my last script replaced some but didn't update product array in memory)
  if(!content.includes('"' + invalidId + '"')) continue;

  let catKey = product.category;
  if (catKey === 'Storage Devices') catKey = 'StorageDevices';
  
  const pool = validCats[catKey] || [];
  let replacement = null;
  
  // 1. Try category pool
  for (const id of pool) {
    if (!usedIds.has(id)) {
      replacement = id;
      usedIds.add(id);
      break;
    }
  }
  
  // 2. Try global tech pool
  if (!replacement) {
    for (const id of allValidPool) {
      if (!usedIds.has(id)) {
        replacement = id;
        usedIds.add(id);
        break;
      }
    }
  }
  
  if (replacement) {
    content = content.replace(new RegExp('"' + invalidId + '"', 'g'), '"' + replacement + '"');
    replacements++;
  } else {
    console.log('CRITICAL: No replacement found for', product.title);
  }
}

fs.writeFileSync('productData.js', content);
console.log('Replaced', replacements, 'broken IDs using fallback pools!');
