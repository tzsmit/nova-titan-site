# Brownwood gallery — draft and publication control

The nine selected photographs and their neutral captions, phase descriptions, SEO fields and draft visibility settings were approved for public marketing use and upload to GitHub PR #62 on September 21, 2026. Live-site merge and deployment remain on hold.

The Field Work feature presents six photographs. The project page presents nine photographs across cable termination/pathway coordination (four), rack preparation/equipment setup (two), and retail workstation System Set (three). The existing gallery remains in place.

Build the review preview with `bundle exec jekyll build --config _config.yml,_config.preview.yml --destination _preview`.

Production excludes the Brownwood page and image directory. The case remains `unpublished`; its page remains `noindex` and excluded from the sitemap. Project cards, gallery features, internal proof links and image schema respect this publication state.

Before live release:
1. Obtain approval to merge and deploy this prepared project feature. Photo-upload approval alone does not authorize deployment.
2. Set the case to `published` and its `date_iso` to the actual publication date. Keep the project date separate.
3. Keep the nine approved image records marked `approved`. Remove page `noindex` and `sitemap: false`, and remove only the Brownwood page and image-directory exclusions from `_config.yml`.
4. Run the normal production build, SEO checks and desktop/mobile review. Confirm the six Field Work cards, nine phase-grouped project photos, working service links and matching ImageObject data. Check image paths and sitemap in production output.
5. Merge through the GitHub workflow only after release approval; verify the live page and sitemap afterward.

Use only the 27 checked-in derivatives for the nine selected photos (WebP, JPEG and 400-pixel WebP per photo). The original archives, private review manifest and rejected photographs are not part of the repository change. Do not add unused local candidate images.

Describe visible progress accurately. The photo sequence does not establish final project acceptance, certification results, electrical work performed by Nova Titan, or a direct relationship with the retail operator.
