# NameSpring Contribute

Community-driven contribution system for the **NameSpring** name database — an open dataset of personal names from multiple cultures.

## 🗂️ Repository Structure

```

.
├── data/
│   ├── names/             # Name files by origin (e.g. arabic.json)
│   ├── origins.json       # List of supported origins
│   ├── index.json         # Unified index of all names
│   └── contributions/     # Community submissions
│       ├── pending/       # Awaiting review (by PR)
│       ├── approved/      # Accepted contributions
│       └── rejected/      # Rejected (not used by CI)
├── schema/                # JSON Schema for contribution files
├── scripts/               # Validation, generation, application tools
└── .github/workflows/     # CI pipeline for automatic validation

```

## 🚀 How to Contribute

1. **Fork** this repository and clone your fork.
2. Create a new JSON file inside `data/contributions/pending/` following this format:

```json
{
  "id": 101,
  "target_file": "arabic.json",
  "changes": {
    "meaning": "Updated meaning",
    "description": "Updated description"
  },
  "translations": {},
  "proposed_by": "your-github-username",
  "created_at": "2025-06-17T00:00:00.000Z"
}
```

· id: The unique numeric ID of the name to modify.
· target_file: The exact file in data/names/ containing that name.
· changes: At least one of meaning or description must be non-empty.
· translations (optional): Translations in other languages.
· proposed_by: Your GitHub username (or community name).

3. Validate locally before pushing:

```bash
node scripts/validate-contribution.js data/contributions/pending/your-file.json
```

4. Commit and push your branch. Open a Pull Request against the main branch.
5. GitHub Actions will automatically check your contribution. If it passes, it’s ready for review.
6. Once merged, a maintainer runs:

```bash
node scripts/apply-contribution.js <your-file-name>
```

This will update the actual name data and move your contribution to approved/.

✅ Validation Rules (enforced by CI)

· File must be valid JSON.
· Must contain id (number), target_file (string), and changes (object).
· target_file must exist in data/names/.
· The name with the given id must exist inside that file.
· meaning and description cannot be empty strings.

🛠️ Local Scripts

Generate a contribution file quickly

```bash
node scripts/generate-contribution.js <id> <target_file> "<meaning>" "<description>" "<proposed_by>"
```

Validate any contribution file

```bash
node scripts/validate-contribution.js <path>
```

Apply an approved contribution (maintainers only)

```bash
node scripts/apply-contribution.js <file-name-in-pending>
```

📄 License

This project is dedicated to the public domain under CC0 1.0 Universal.
You can use, modify, and distribute the data freely.

---

Maintained by @EKITEAM ❤️
