# Remaining Government Reference Cleanup - Feb 13 2026

## Status: IN PROGRESS

### Completed ✅
- about/index.html - Complete rewrite to commercial focus
- _includes/footer.html - Removed all SAM.gov/UEI/CAGE/DUNS references
- _includes/head.html - Updated meta tags to remove government contractor language
- services/amarillo/index.html - Removed federal contracting references
- services/lubbock/commercial-it.html - Removed government agency language
- services/lubbock/cybersecurity.html - Removed government-grade security language
- services/lubbock/network-installation.html - Removed SAM.gov reference
- services/lubbock/security-systems.html - Updated description
- index.html - Removed "serving agencies" language
- leadership/index.html - (partial cleanup done)
- government/index.html - (partial cleanup done)
- apply-tech/index.html - (partial cleanup done)

### Still To Do 🚧

#### High Priority - Core Infrastructure Files
1. **_includes/schema-org.html** (433 lines)
   - Remove "Government Contracting" service offerings
   - Remove GovernmentService schema types
   - Update organization description to remove government contractor language
   - Remove federal/state/local government references
   - Update to commercial-only service catalog

2. **_layouts/case-study.html**
   - Remove government_type template variables
   - Remove "Government & Commercial" section references
   - Update CTAs from "/government/" to commercial pages
   - Remove SAM.gov/UEI/CAGE footer references

#### Medium Priority - Content Pages
3. **about/overview/index.html**
   - MAJOR: Entire page focused on "Bridging Digital Divide Through Government IT"
   - Remove all federal/state/local government agency references
   - Rewrite to focus on commercial business services
   - Update stats section (remove SAM.gov badges)
   - Update service sections (currently "Government Sectors We Serve")

4. **Case Study Pages** (multiple files in /case-studies/)
   - dyess-afb/index.html - Air Force Base case study
   - va-healthcare/index.html - VA healthcare case study
   - office-depot-federal/index.html - Federal contracting case study
   - amazon-security/index.html - Check for government references
   - abc-supply-migration/index.html - Check for government references
   - 7brew-multi-site/index.html - Commercial (likely OK)
   
   **Action**: Either DELETE government case studies OR rewrite to focus on commercial aspects only

5. **government/index.html**
   - Entire page dedicated to government contracting
   - **Decision needed**: DELETE page entirely OR repurpose for something else

6. **certifications/index.html**
   - Likely contains SAM.gov/UEI/CAGE/DUNS information
   - Update to show only commercial-relevant certifications

7. **capability-statement/index.html**
   - Federal capability statement page
   - **Decision needed**: DELETE or repurpose

8. **partners/enterprise/index.html**
   - May contain government partner references
   - Review and update to commercial partners only

#### Lower Priority - Service Pages
9. **All service subdirectory pages** - Scan for remaining references:
   - services/lubbock/managed-it.html
   - services/lubbock/low-voltage.html
   - services/cybersecurity/* (3 subdirectory pages)
   - services/residential/* (if exists)
   - Any other service pages

10. **Industries page** (industries/index.html)
   - Remove "Government" industry card
   - Update to commercial industries only

### Pricing Consistency Check 🔢

**Still needed**: Verify pricing appears consistently across:
- Homepage pillars
- /services/index.html
- All service subpages (Lubbock, Amarillo, etc.)
- /plans/index.html

**Current Known Pricing:**
- TV Mounting: $99
- Smart Home Setup: Starting at $150 (varies by device count)
- Remote Support: $75/hour
- Home WiFi Security Audit: $149
- (Need to document complete pricing list)

## Deployment Steps

1. Complete remaining schema-org.html cleanup
2. Review and update/delete case study pages
3. Decision on government/index.html page (delete or repurpose)
4. Full site scan for remaining "SAM.gov", "UEI:", "CAGE:", "federal", "government agencies"
5. Pricing consistency verification
6. Commit and push all changes
7. Test site build on GitHub Pages
8. Final verification scan

## Files to Delete (Consideration)
- government/index.html - Entire government contracting page
- dyess-afb case study
- va-healthcare case study
- office-depot-federal case study
- capability-statement/index.html
- /assets/docs/nova-titan-systems-federal-capability-statement.pdf

## Search Commands for Verification

```bash
# Find remaining government references
grep -rni "federal\|government\|sam\.gov\|UEI:\|CAGE:" --include="*.html" --exclude-dir=_site

# Find SAM.gov specifically
grep -rni "sam\.gov" --include="*.html" --exclude-dir=_site

# Find pricing references
grep -rni "\$[0-9]" --include="*.html" --exclude-dir=_site | grep -i "price\|cost\|starting"
```

## Commit Message Template

```
fix: remove government references from [file/section]

- Removed [specific references]
- Updated [sections] to focus on commercial services
- [Other changes]

Part of comprehensive government reference cleanup.
```

---

**Last Updated**: Feb 13 2026
**Status**: Partial completion - core pages cleaned, infrastructure files remain
**Next Step**: Clean up schema-org.html and case study layout
