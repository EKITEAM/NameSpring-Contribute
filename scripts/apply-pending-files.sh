#!/bin/bash
PENDING_DIR="data/contributions/pending"
for file in "$@"; do
  if [[ "$file" == $PENDING_DIR/*.json ]]; then
    node scripts/apply-contribution.js "$(basename "$file")"
  fi
done
