const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'schema', 'contribution.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

function validate(contributionPath) {
  if (!fs.existsSync(contributionPath)) {
    console.error(`File not found: ${contributionPath}`);
    process.exit(1);
  }

  let contribution;
  try {
    contribution = JSON.parse(fs.readFileSync(contributionPath, 'utf-8'));
  } catch (e) {
    console.error(`Invalid JSON: ${e.message}`);
    process.exit(1);
  }

  const errors = [];

  if (!contribution.id || typeof contribution.id !== 'number') {
    errors.push('Missing or invalid id (must be number)');
  }
  if (!contribution.target_file || typeof contribution.target_file !== 'string') {
    errors.push('Missing or invalid target_file');
  }
  if (!contribution.changes || typeof contribution.changes !== 'object') {
    errors.push('Missing changes object');
  } else {
    if (contribution.changes.meaning === '' || contribution.changes.description === '') {
      errors.push('Changes fields cannot be empty string');
    }
  }

  if (errors.length > 0) {
    console.error('Schema validation errors:');
    errors.forEach(e => console.error(`- ${e}`));
    process.exit(1);
  }

  const targetPath = path.join(__dirname, '..', 'data', 'names', contribution.target_file);
  if (!fs.existsSync(targetPath)) {
    console.error(`Target file not found: ${contribution.target_file}`);
    process.exit(1);
  }

  const names = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
  const nameEntry = names.find(n => n.id === contribution.id);
  if (!nameEntry) {
    console.error(`ID ${contribution.id} not found in ${contribution.target_file}`);
    process.exit(1);
  }

  console.log(`Validation passed: ${contributionPath}`);
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node validate-contribution.js <path-to-contribution.json>');
  process.exit(1);
}
validate(filePath);
