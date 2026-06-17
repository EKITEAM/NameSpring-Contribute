const fs = require('fs');
const path = require('path');

const data = {
  id: Number(process.argv[2]) || 0,
  target_file: process.argv[3] || '',
  changes: {
    meaning: process.argv[4] || '',
    description: process.argv[5] || ''
  },
  translations: {},
  proposed_by: process.argv[6] || 'community',
  created_at: new Date().toISOString()
};

if (!data.id || !data.target_file || !data.changes.meaning) {
  console.error('Usage: node generate-contribution.js <id> <target_file> "<meaning>" "<description>" "<proposed_by>"');
  process.exit(1);
}

const destDir = path.join(__dirname, '..', 'data', 'contributions', 'pending');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const fileName = `contribution-${data.id}-${Date.now()}.json`;
const filePath = path.join(destDir, fileName);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Created: ${fileName}`);
