# NameSpring Open Name Database

An open-source dataset of personal names from multiple cultures, structured as JSON files.

## Structure
```

.
├── data/
│   ├── names/       # Name files by origin (arabic.json, english.json, ...)
│   ├── index.json   # Unified index of all names
│   └── origins.json # List of supported origins

```

## How to contribute

1. Fork this repository.
2. Edit any name file directly in `data/names/` (or add new names following the existing JSON format).
3. Make sure your changes are valid JSON (you can test with [JSONLint](https://jsonlint.com/)).
4. Open a Pull Request against the `main` branch with a brief description.

## JSON format for names

Each name is an object inside the array:
```json
{
  "id": 123,
  "name": "Example",
  "gender": "male",
  "origin": "arabic",
  "religion": "islamic",
  "rarity": "common",
  "meaning": "Meaning text",
  "description": "Description text"
}
```

Please keep the same fields and ensure id is unique.

License

CC0 1.0 Universal

Maintained by @EKITEAM
