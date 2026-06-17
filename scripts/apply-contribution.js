const fs = require('fs');
const path = require('path');

function apply(fileName) {
  const pendingDir = path.join(__dirname, '..', 'data', 'contributions', 'pending');
  const approvedDir = path.join(__dirname, '..', 'data', 'contributions', 'approved');
  const contribPath = path.join(pendingDir, fileName);

  if (!fs.existsSync(contribPath)) {
    console.error(`Contribution file not found: ${fileName}`);
    process.exit(1);
  }

  const contribution = JSON.parse(fs.readFileSync(contribPath, 'utf-8'));
  const targetPath = path.join(__dirname, '..', 'data', 'names', contribution.target_file);
  const names = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));

  const index = names.findIndex(n => n.id === contribution.id);
  if (index === -1) {
    console.error(`ID ${contribution.id} not found in target file`);
    process.exit(1);
  }

  if (contribution.changes) {
    if (contribution.changes.meaning) {
      names[index].meaning = contribution.changes.meaning;
    }
    if (contribution.changes.description) {
      names[index].description = contribution.changes.description;
    }
  }

  if (contribution.translations) {
    names[index].translations = names[index].translations || {};
    Object.assign(names[index].translations, contribution.translations);
  }

  fs.writeFileSync(targetPath, JSON.stringify(names, null, 2));

  const approvedFile = path.join(approvedDir, fileName);
  fs.renameSync(contribPath, approvedFile);
  console.log(`Applied: ${fileName}`);
}

const file = process.argv[2];
if (!file) {
  console.error('Usage: node apply-contribution.js <file-name-in-pending>');
  process.exit(1);
}
apply(file);
