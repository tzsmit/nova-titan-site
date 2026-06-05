# Nova Titan Work Gallery Batch 2 — Processed Assets

Generated package for upload to Genspark AI / Nova Titan site repo.

## Contents

- `assets/images/work/` — optimized JPG + WebP files
- `_data/work_gallery_additions_batch2.yml` — gallery entries ready to merge into site data
- `photo_manifest_batch2.csv` — source-to-output manifest with alt text, captions, categories, and sensitivity notes
- `GENSPARK_PROMPT_BATCH2.txt` — paste-ready implementation prompt

## Processing performed

- Auto-oriented uploaded JPGs using EXIF data.
- Resized large images to max width 1600px.
- Exported optimized `.webp` and `.jpg` versions.
- Applied targeted Gaussian blur to visible customer/site labels, live camera view, handwritten store/site identifiers, device/site labels, and browser/header area on speed test image where needed.
- Rejected photos from the user's review list were not included.

## Important

Before publishing, do one final visual review in the browser. The processed images are intended to remove obvious sensitive information, but field photos can contain small labels or site details that only the owner may recognize.

Approved output count: 25 unique source photos.

Note: two potential duplicate use-cases were intentionally removed so the live gallery does not repeat the same source photo under different filenames.
