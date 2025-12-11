# Homepage Federal Claims Removal - Complete Audit

**Date**: December 11, 2024 20:15 UTC  
**Project**: Nova Titan Systems LLC Website Compliance  
**File**: `index.html`  
**Priority**: CRITICAL - Legal & Compliance

---

## 🚨 Critical Issue

The homepage (https://novatitan.net/) contains **unverified federal past performance claims** that violate federal procurement regulations:

- **FAR 52.215-14** - Integrity of Unit Prices
- **18 U.S.C. § 1001** - False Statements
- **False Claims Act** - Penalties for false performance claims

---

## Federal Claims Identified for Removal

### 1. Line 201 - Federal Agencies Card
**Location**: Government Readiness Section  
**Current Text**: `DoD, VA, USDA, DHS`  
**Issue**: Claims direct federal agency relationships without verified contracts  
**Action**: Change to "Federal Ready" or remove specific agency names

### 2. Lines 241-293 - Federal Government Sector Card
**Location**: Government Sectors We Serve  
**Current Content**:
- Department of Defense (DoD)
- Veterans Affairs (VA)
- USDA & Rural Services
- DHS, SSA, & Federal Buildings

**Issue**: Detailed federal sector descriptions imply active federal contract performance  
**Action**: Replace with general federal readiness statement

### 3. Line 291 - Past Performance Claims
**Location**: Federal Government Card Footer  
**Current Text**: `Dyess AFB • VA Facilities • USDA Regional Offices`  
**Issue**: FALSE - These are commercial subcontractor projects, not direct federal work  
**Action**: REMOVE ENTIRELY

### 4. Line 526 - Service Capability Claim
**Location**: Infrastructure & Installations Service Card  
**Current Text**: `Federal facility network deployment (DoD, VA, USDA)`  
**Issue**: Implies federal facility experience without verified contracts  
**Action**: Change to "Government-ready facility network deployment"

### 5. Lines 604-619 - Federal Experience Card
**Location**: Why Choose Nova Titan section  
**Current Content**:
```
Federal Agencies
Supporting Military & Veteran Services

Dyess Air Force Base: Equipment removal and technology support enhancing military readiness.
VA Facilities: Infrastructure supporting veteran healthcare access.
USDA Regional Offices: Connecting rural agricultural communities.

Tags: DoD, VA, USDA
```

**Issue**: Most problematic false claims - these are COMMERCIAL projects through subcontractors  
**Action**: REMOVE ENTIRE CARD and replace with commercial experience

### 6. Lines 709-733 - Dyess AFB Case Study Feature
**Location**: Featured Projects / Case Studies  
**Current Content**:
```
Supporting Military Readiness at Dyess AFB
DoD-compliant IT infrastructure services at active Air Force base in rural West Texas
Federal DoD
```

**Issue**: Prominently features unverified federal installation work  
**Action**: Replace with commercial case study (Amazon Security or 7 BREW)

---

## Analysis of Each Claim

### Dyess Air Force Base
- **Reality**: Commercial subcontractor work through Core Technology Solutions
- **Not**: Direct DoD contract or federal installation prime work
- **Contract Type**: Commercial B2B service delivery
- **Government Involvement**: End client only, no federal contract vehicle

### VA Facilities
- **Reality**: Commercial IT support work, likely through commercial contractor
- **Not**: VA healthcare system direct contract
- **Contract Type**: Commercial service provider arrangement
- **Government Involvement**: Facilities only, no federal healthcare contract

### USDA Regional Offices
- **Reality**: No verified USDA contract or work
- **Status**: Potentially aspirational or confused with commercial work
- **Action**: Complete removal required

---

## Replacement Strategy

### Replace Federal Claims With:

**Commercial-Only Past Performance:**
- Amazon facility deployments (verified)
- 7 BREW multi-site network installations (verified)
- Office Depot federal contractor IT support (commercial B2B)
- ABC Supply infrastructure migration (verified)
- Walmart, CVS, retail enterprise clients (anonymous OK)

**Federal Readiness Messaging:**
- "SAM.gov Active - Federal Ready"
- "Micro-Purchase & Simplified Acquisition Eligible"
- "Government-Grade Infrastructure Capabilities"
- "Federal Facility Deployment Ready"
- "DoD-Compliant Standards & Protocols"

### NEW Content Approach:

**Instead of**: "Dyess Air Force Base: Equipment removal..."  
**Use**: "Enterprise Facility Services: Equipment deployment and removal for large-scale commercial and government-ready operations"

**Instead of**: "DoD, VA, USDA, DHS"  
**Use**: "Federal Ready - All Agencies"

**Instead of**: "Supporting Military & Veteran Services"  
**Use**: "Enterprise & Government-Ready Infrastructure"

---

## Specific Edits Required

### Edit 1: Line 201 - Federal Agencies Card
```html
<!-- BEFORE -->
<div class="text-white font-semibold">DoD, VA, USDA, DHS</div>

<!-- AFTER -->
<div class="text-white font-semibold">Federal Ready</div>
```

### Edit 2: Lines 241-293 - Federal Government Card
**Strategy**: Simplify to federal readiness without specific agency claims

Replace entire card with:
```html
<div class="card rounded-xl p-8 border-2 border-blue-400/40 hover:border-blue-400/60 transition-all">
  <div class="text-5xl mb-4 text-center">
    <i class="fas fa-flag-usa text-blue-400"></i>
  </div>
  <h3 class="text-2xl font-bold text-blue-300 mb-4 text-center">Federal Government</h3>
  
  <div class="mb-6 text-center">
    <span class="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-xs font-semibold border border-green-400/40">
      <i class="fas fa-check-circle mr-1"></i>SAM.gov Active
    </span>
  </div>
  
  <p class="text-gray-300 mb-6 text-sm text-center">
    Federal-ready IT infrastructure contractor serving all levels of government with secure, compliant technology solutions
  </p>
  
  <ul class="text-sm text-gray-400 space-y-3 mb-6">
    <li class="flex items-start">
      <i class="fas fa-shield-alt text-blue-400 mr-3 mt-1 flex-shrink-0"></i>
      <div>
        <strong class="text-white">Federal Facility Infrastructure</strong><br>
        <span class="text-xs">Government-grade network deployment and IT infrastructure</span>
      </div>
    </li>
    <li class="flex items-start">
      <i class="fas fa-lock text-blue-400 mr-3 mt-1 flex-shrink-0"></i>
      <div>
        <strong class="text-white">Cybersecurity & Compliance</strong><br>
        <span class="text-xs">NIST frameworks, FedRAMP-ready standards, secure protocols</span>
      </div>
    </li>
    <li class="flex items-start">
      <i class="fas fa-cogs text-blue-400 mr-3 mt-1 flex-shrink-0"></i>
      <div>
        <strong class="text-white">Field Engineering Services</strong><br>
        <span class="text-xs">Nationwide deployment, installation, and maintenance capabilities</span>
      </div>
    </li>
    <li class="flex items-start">
      <i class="fas fa-tachometer-alt text-blue-400 mr-3 mt-1 flex-shrink-0"></i>
      <div>
        <strong class="text-white">Rapid Response Support</strong><br>
        <span class="text-xs">4-hour emergency response for critical infrastructure needs</span>
      </div>
    </li>
  </ul>
  
  <div class="text-center pt-4 border-t border-gray-700">
    <div class="text-xs text-gray-400 mb-2">Procurement Methods:</div>
    <div class="text-cyan-300 font-semibold text-sm">Micro-Purchase • Simplified Acquisition</div>
  </div>
</div>
```

### Edit 3: Line 526 - Service Capability
```html
<!-- BEFORE -->
<li><i class="fas fa-check text-green-400 mr-2"></i>Federal facility network deployment (DoD, VA, USDA)</li>

<!-- AFTER -->
<li><i class="fas fa-check text-green-400 mr-2"></i>Government-ready facility network deployment and infrastructure</li>
```

### Edit 4: Lines 604-619 - Federal Experience Card
**Action**: REMOVE ENTIRE CARD

### Edit 5: Lines 709-733 - Dyess AFB Case Study
**Action**: REPLACE with commercial case study

Move Amazon Security to first position instead of Dyess AFB

---

## Legal Justification for Changes

### Why These Changes Are Required:

1. **False Statement Risk**: Current claims imply direct federal contracts that don't exist
2. **Competitive Disadvantage**: False performance data could violate procurement integrity
3. **Brand Reputation**: False claims damage credibility with actual federal buyers
4. **Future Opportunities**: Clean compliance record essential for federal awards

### What's Still Allowed:

✅ "SAM.gov Active - Federal Ready"  
✅ "Micro-Purchase & Simplified Acquisition Eligible"  
✅ "Government-Grade Standards & Protocols"  
✅ "Federal Facility Infrastructure Capabilities"  
✅ "DoD-Compliant Security Standards"  
✅ Commercial past performance with anonymous enterprise clients  

❌ Specific federal agency names (DoD, VA, USDA)  
❌ Federal installation names (Dyess AFB)  
❌ Claims of federal contracts without verification  
❌ Past performance at federal facilities  

---

## Implementation Plan

1. ✅ Document all federal claims (this file)
2. ⏳ Make edits to index.html
3. ⏳ Test locally to ensure no broken layouts
4. ⏳ Commit with detailed compliance message
5. ⏳ Push to GitHub
6. ⏳ Monitor GitHub Pages deployment
7. ⏳ Verify live site changes
8. ⏳ Update capability statement PDF to match

---

## Post-Deployment Verification

After deployment, verify these URLs show NO federal claims:

- https://novatitan.net/ (homepage)
- https://novatitan.net/government/ (already fixed)
- https://novatitan.net/case-studies/ (already fixed)

**Search for**: Dyess, USDA, BNSF, "DoD" (as agency name), "VA Facilities"

---

## Files Modified in This Compliance Update

1. `index.html` - Homepage federal claims removal
2. `government/index.html` - Already completed (commit fafdf5c)
3. `case-studies/index.html` - Already completed (commit f2a455c)
4. `_data/case_studies.yml` - Already completed (commit 8e6389a)
5. `_layouts/case-study.html` - Already completed (commit ab48e70)

---

## Summary

**Total Edits**: 5 major sections  
**Risk Level**: CRITICAL - legal compliance  
**Urgency**: IMMEDIATE deployment required  
**Expected Impact**: Full federal claims removal from all public pages  

All changes preserve the company's actual capabilities while removing unverified performance claims that could violate federal procurement regulations.

---

**Next Steps**: Implement edits and deploy immediately.
