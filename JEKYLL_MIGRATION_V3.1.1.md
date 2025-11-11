# Jekyll Migration v3.1.1 - Implementation Guide

## ✅ Completed Infrastructure (Phase 1)

### Core Jekyll Structure
All foundational Jekyll infrastructure has been created and is ready for use:

#### 1. Configuration (`_config.yml`)
- ✅ Complete site settings with title, description, URL
- ✅ Jekyll plugins: `jekyll-seo-tag`, `jekyll-sitemap`
- ✅ Default front matter configuration
- ✅ Collections setup for blog posts
- ✅ Social media links and author info

#### 2. Data Files (`_data/`)
- ✅ `nav.yml` - Centralized navigation menu with 8 items:
  - Home, About, Solutions, Plans, Portfolio, Blog, Testimonials, Contact
  - Includes icon classes for Font Awesome

#### 3. Includes (`_includes/`)
- ✅ `head.html` - Complete SEO, meta tags, JSON-LD schema, analytics
  - Jekyll SEO tag integration
  - LocalBusiness JSON-LD with area served
  - Plausible & Google Analytics
  - Font preloading and favicon links
  
- ✅ `header.html` - Unified navigation with active state logic
  - Responsive desktop/mobile navigation
  - Hamburger menu for mobile
  - Active page highlighting
  - Driven by `_data/nav.yml`
  
- ✅ `footer.html` - Complete company footer
  - Brand info and certifications
  - Quick links
  - Contact information
  - Social media icons with animations
  
- ✅ `scripts.html` - Proper script loading order
  - Particles.js → GSAP → nav.js
  - Page-specific script hooks
  - Console branding

#### 4. Layouts (`_layouts/`)
- ✅ `default.html` - Base layout using all includes
  - Matrix background
  - Particles container
  - Header, content, footer structure
  
- ✅ `post.html` - Blog post layout
  - Article header with metadata
  - Prose styling for content
  - Share buttons
  - Related posts section

#### 5. Assets (`assets/js/`)
- ✅ `nav.js` - Navigation functionality
  - Mobile menu toggle with accessibility
  - Smooth scroll for anchors
  - Sticky nav enhancements
  - Active state management

---

## 🔄 Migration Tasks (Phase 2 - Required)

### Current State
All HTML pages (`index.html`, `services/index.html`, etc.) currently have:
- ❌ Full `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` structure
- ❌ Hardcoded navigation in each file
- ❌ Hardcoded footers in each file
- ❌ Duplicate CSS/JS includes
- ❌ No Jekyll front matter

### What Needs to Happen
Each page must be converted from full HTML to Jekyll content-only format:

#### Before (Current):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Title | Nova Titan Systems</title>
  <!-- ... lots of CSS/JS includes ... -->
</head>
<body>
  <nav><!-- hardcoded navigation --></nav>
  
  <!-- Page Content Here -->
  
  <footer><!-- hardcoded footer --></footer>
  <script><!-- scripts --></script>
</body>
</html>
```

#### After (Target):
```html
---
title: "Page Title"
description: "Page description for SEO"
layout: default
---

<!-- Page Content Only - No HTML/head/body tags -->
<section class="content pt-28 pb-14">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Your page content here -->
  </div>
</section>
```

### Pages Requiring Migration

1. **index.html** (Homepage)
2. **about/index.html**
3. **services/index.html**
4. **plans/index.html**
5. **portfolio/index.html**
6. **blog/index.html**
7. **testimonials/index.html**
8. **contact/index.html**
9. **book-now/index.html**
10. **resources/index.html**
11. **faqs/index.html**
12. **capability-statement/index.html**
13. **privacy/index.html**
14. **terms/index.html**
15. **refunds/index.html**

### Migration Checklist Per Page

For each page above:

- [ ] Add Jekyll front matter at the top:
  ```yaml
  ---
  title: "Page Specific Title"
  description: "SEO description"
  layout: default
  ---
  ```

- [ ] Remove `<!DOCTYPE>`, `<html>`, `<head>`, and `<body>` tags
- [ ] Remove hardcoded `<nav>` (header include handles this)
- [ ] Remove hardcoded `<footer>` (footer include handles this)
- [ ] Remove duplicate CSS `<link>` tags (head include handles this)
- [ ] Remove duplicate `<script>` tags (scripts include handles this)
- [ ] Keep only the content sections (`<section>`, `<div>`, etc.)
- [ ] Ensure content has proper classes (`content`, `pt-28` for top padding to account for fixed nav)

---

## 🎯 Benefits of Migration

### 1. Consistency
- ✅ Same header/nav on every page
- ✅ Same footer on every page
- ✅ No more disappearing menus
- ✅ Unified branding everywhere

### 2. Maintainability
- ✅ Change nav once, updates everywhere
- ✅ Add/remove menu items in one place (`_data/nav.yml`)
- ✅ Update contact info once in footer
- ✅ Modify SEO schema in one include file

### 3. SEO Improvements
- ✅ Consistent title format: "Page Title · Nova Titan Systems"
- ✅ Canonical URLs on every page
- ✅ jekyll-seo-tag for proper meta tags
- ✅ LocalBusiness JSON-LD on every page
- ✅ No duplicate or missing meta tags

### 4. Performance
- ✅ No duplicate CSS/JS includes
- ✅ Proper script loading order
- ✅ Font preloading
- ✅ Lazy loading support

### 5. Mobile Experience
- ✅ Consistent mobile menu behavior
- ✅ No conflicts between page scripts
- ✅ Proper z-index handling
- ✅ Accessibility features (aria labels, etc.)

---

## 🚀 Quick Start Guide (For New Pages)

To create a new page using the Jekyll infrastructure:

### Step 1: Create file with front matter
```html
---
title: "My New Page"
description: "Description for SEO"
layout: default
---
```

### Step 2: Add your content
```html
<section class="content pt-28 pb-14">
  <div class="max-w-7xl mx-auto px-6">
    <h1 class="text-4xl font-bold glow mb-6">{{ page.title }}</h1>
    <p class="text-xl text-gray-300">Your content here...</p>
  </div>
</section>
```

### Step 3: Jekyll automatically adds:
- ✅ `<head>` with SEO tags
- ✅ Navigation header
- ✅ Particle/matrix backgrounds
- ✅ Footer with company info
- ✅ All scripts in proper order

---

## 📝 Testing Checklist

After migrating pages, verify:

### Navigation
- [ ] Nav appears on all pages
- [ ] Active page is highlighted
- [ ] Mobile hamburger menu works
- [ ] All links are correct
- [ ] Book Now button appears

### SEO
- [ ] Page title format: "Page · Nova Titan Systems"
- [ ] Meta description present
- [ ] Canonical URL correct
- [ ] JSON-LD schema present
- [ ] No console errors

### Styling
- [ ] Particle background shows
- [ ] Matrix grid animates
- [ ] Card hover effects work
- [ ] Buttons have gradients
- [ ] Mobile responsive

### Scripts
- [ ] GSAP animations work
- [ ] Particles initialize
- [ ] Mobile menu toggles
- [ ] Smooth scroll works
- [ ] No script errors in console

---

## 🛠️ Advanced Customization

### Adding Page-Specific Styles
```html
---
title: "My Page"
layout: default
extra_head: |
  <style>
    .custom-class { color: red; }
  </style>
---
```

### Adding Page-Specific Scripts
```html
---
title: "My Page"
layout: default
extra_scripts: |
  <script>
    console.log('Page-specific script');
  </script>
---
```

### Modifying Navigation
Edit `_data/nav.yml`:
```yaml
- name: New Item
  url: /new-page/
  icon: fas fa-star
```

### Updating Company Info
Edit `_config.yml`:
```yaml
title: "Nova Titan Systems"
phone: "(806) 370-0624"
email: "traivonesmith@novatitan.net"
```

---

## 🚨 Important Notes

### GitHub Pages
- Jekyll builds automatically on push to main
- No need to commit `_site/` folder
- Changes may take 2-5 minutes to deploy

### Local Testing
```bash
# Install Jekyll
bundle install

# Run local server
bundle exec jekyll serve

# View at http://localhost:4000
```

### Backup
Before migrating, ensure you have:
- Git history of all pages
- Ability to revert changes
- Test on a branch first

---

## 📚 Resources

- **Jekyll Documentation**: https://jekyllrb.com/docs/
- **jekyll-seo-tag**: https://github.com/jekyll/jekyll-seo-tag
- **Liquid Template Language**: https://shopify.github.io/liquid/

---

## 🎓 Next Steps

1. **Immediate**: Test new layouts with 1-2 pages
2. **Short-term**: Migrate homepage and main pages
3. **Long-term**: Convert all pages to use Jekyll layouts
4. **Ongoing**: Use Jekyll for all new pages/posts

---

## ✨ Status Summary

**Infrastructure**: ✅ 100% Complete  
**Page Migration**: ⏳ 0% Complete (15 pages pending)  
**Testing**: ⏳ Pending migration  
**Deployment**: ✅ Ready for use

The Jekyll infrastructure is production-ready and waiting for page migration.
