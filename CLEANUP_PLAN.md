# Site Cleanup Plan - Feb 13 2026

## Pages to Remove (Confirmed Unnecessary)

### 1. `/join-our-network/` 
- **Reason**: Simple redirect to `/apply-tech/`, redundant
- **Action**: Delete entire directory

### 2. `/ceo/` 
- **Reason**: Duplicate content, can redirect to `/leadership/`
- **Action**: Delete directory, add redirect

### 3. `/discovery-call/`
- **Reason**: Duplicate of `/book-now/` (same calendar)
- **Action**: Delete directory, add redirect

### 4. `/blog/`
- **Reason**: No actual content, just "coming soon" placeholders
- **Action**: Delete directory (can restore later with real content)

### 5. `/admin/` (Netlify CMS)
- **Reason**: Not being used for static Jekyll site
- **Action**: Delete directory

### 6. `/api/` (server.js)
- **Reason**: Not needed for static site
- **Action**: Delete directory

## Pages to Keep (But Hidden/In Development)

- `/products/` - Products in development (CloudWarden, AI Engine, Sports)
  - Keep but add `robots: noindex` if not already present
- `/divisions/` - Multi-division structure
  - Review and possibly consolidate

## Redirects to Add

Create `_redirects` file for Netlify/GitHub Pages:
```
/join-our-network/    /apply-tech/          301
/ceo/                 /leadership/          301
/discovery-call/      /book-now/            301
/blog/                /resources/           301
```

