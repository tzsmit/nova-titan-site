# ⚠️ CAPABILITY STATEMENT UPDATE REQUIRED

**Date:** December 11, 2024  
**Priority:** HIGH  
**Status:** Action Required

---

## 🚨 IMMEDIATE ACTION NEEDED

The Federal Capability Statement PDF **MUST be updated** to reflect recent website compliance changes.

---

## ❌ WHAT TO REMOVE

### Manufacturing NAICS Codes (REMOVE THESE):
- **334118** - Computer Terminal Equipment Manufacturing
- **334290** - Other Communications Equipment Manufacturing

**Reason for Removal:**  
Nova Titan Systems is an **IT services + field services provider**, NOT a manufacturing company. These codes were removed from the website on December 11, 2024 for compliance reasons.

---

## ✅ CORRECT NAICS CODES TO KEEP

### Primary NAICS:
- **541519** - Other Computer Related Services

### Additional NAICS (8 total):
1. **238210** - Electrical Contractors and Other Wiring Installation Contractors
2. **238990** - All Other Specialty Trade Contractors
3. **541512** - Computer Systems Design Services
4. **541513** - Computer Facilities Management Services
5. **541611** - Administrative Management And General Management Consulting Services
6. **541690** - Other Scientific And Technical Consulting Services
7. **561621** - Security Systems Services (Except Locksmiths)

**Total:** 8 service-based NAICS codes (NO manufacturing codes)

---

## 📄 FILES TO UPDATE

### Primary Capability Statement:
**Location:** `/assets/docs/nova-titan-systems-federal-capability-statement.pdf`  
**Size:** 197KB  
**Last Modified:** December 1, 2024  
**Status:** ⚠️ OUTDATED - Contains manufacturing NAICS

### Alternate Capability Statement:
**Location:** `/assets/capability-statement/novatitan-capability-statement.pdf`  
**Size:** 385KB  
**Last Modified:** November 22, 2024  
**Status:** ⚠️ OUTDATED - Contains manufacturing NAICS

---

## 🔧 HOW TO UPDATE

### Step 1: Open Source File
Open the source document (Word, InDesign, etc.) for the capability statement.

### Step 2: Find NAICS Section
Locate the section listing NAICS codes (usually on page 1 or 2).

### Step 3: Remove Manufacturing Codes
Delete these two lines:
- 334118 - Computer Terminal Equipment Manufacturing
- 334290 - Other Communications Equipment Manufacturing

### Step 4: Verify Final List
Ensure only these 8 service-based NAICS codes remain:
- 541519 (Primary)
- 238210, 238990, 541512, 541513, 541611, 541690, 561621

### Step 5: Export as PDF
Save/export the updated document as PDF.

### Step 6: Replace Files
Replace both PDF files:
```bash
cp updated-capability-statement.pdf /home/user/webapp/assets/docs/nova-titan-systems-federal-capability-statement.pdf
cp updated-capability-statement.pdf /home/user/webapp/assets/capability-statement/novatitan-capability-statement.pdf
```

### Step 7: Verify Download Links
Test all download links on the website:
- Homepage (2 instances)
- Government page (1 instance)
- Footer (1 instance)

---

## 📍 DOWNLOAD LINK LOCATIONS

### Homepage (`/index.html`):
- Line ~200: Main CTA button
- Line ~350: Secondary download link

### Government Page (`/government/index.html`):
- Line ~715: Download section

### Footer (`/_includes/footer.html`):
- Line 63: Quick links section

---

## ⚠️ WHY THIS MATTERS

### Compliance Risk:
- Manufacturing NAICS codes could **disqualify** Nova Titan from service-based solicitations
- Creates **false impression** for federal procurement officers
- **Contradicts** website content (website was corrected Dec 11)

### Consistency:
- Website shows 8 service NAICS codes
- PDF must match website to avoid confusion
- Federal buyers need accurate information

---

## ✅ VERIFICATION CHECKLIST

After updating, verify:
- [ ] Capability statement PDF opens correctly
- [ ] Only 8 service-based NAICS codes listed
- [ ] No manufacturing codes (334118, 334290) present
- [ ] All download links work
- [ ] PDF downloads correctly from all pages
- [ ] File size is reasonable (<500KB)
- [ ] Document is professionally formatted

---

## 📞 QUESTIONS?

Contact: Traivone Smith  
Email: info@novatitan.net  
Phone: (806) 370-0624

---

**DEADLINE:** Update before next federal buyer inquiry

**STATUS:** 🔴 PENDING - Must update both PDF files

---

**END OF UPDATE NOTICE**

*Created: December 11, 2024*
