const https = require('https');
const fs = require('fs');

https.get('https://picsum.photos/v2/list?page=5&limit=30', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const list = JSON.parse(data);
    const newIds = list.map(item => {
      const match = item.url.match(/unsplash\.com\/photos\/(.+)$/);
      return match ? match[1] : null;
    }).filter(x => x);
    
    let content = fs.readFileSync('productData.js', 'utf8');
    const invalidInDb = require('./invalid_in_db.json');
    const invalidIds = invalidInDb.map(url => {
      const match = url.match(/photo-([a-zA-Z0-9-]+)/);
      return match ? match[1] : null;
    }).filter(x => x);

    let replaced = 0;
    for(let invalidId of invalidIds) {
      if(content.includes('"' + invalidId + '"') && newIds.length > 0) {
        const replacement = newIds.pop();
        content = content.replace(new RegExp('"' + invalidId + '"', 'g'), '"' + replacement + '"');
        replaced++;
      }
    }
    fs.writeFileSync('productData.js', content);
    console.log('Replaced', replaced, 'remaining broken IDs with Picsum Unsplash IDs!');
  });
});
