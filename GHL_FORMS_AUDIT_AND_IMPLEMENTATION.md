# 🎯 GOHIGHLEVEL (GHL) FORMS - COMPREHENSIVE AUDIT & UPGRADE

**Date:** December 11, 2024  
**Location ID:** l9FXVehNOazAR0Uexx8J  
**API Version:** GHL v2.0 (2021-07-28)  
**Status:** ✅ **AUDIT COMPLETE - IMPLEMENTATION IN PROGRESS**

---

## 📋 EXECUTIVE SUMMARY

This document provides a complete audit of all GoHighLevel (GHL) form integrations for Nova Titan Systems LLC, identifies gaps, and outlines implementation of missing forms using GHL API v2.0.

**Critical Findings:**
- ✅ **3 forms exist** in GHL
- ❌ **Government page has NO form** (critical gap)
- ❌ **No dedicated subcontractor intake form**
- ⚠️ **Forms lack proper pipeline routing**
- ⚠️ **Missing hidden fields for UTM tracking**

---

## 🔍 PART 1: EXISTING FORM AUDIT

### Currently Discovered Forms in GHL

| Form ID | Form Name | Status | Current Use |
|---------|-----------|--------|-------------|
| `JhTgjBW3Yvp8gvROVgVR` | NT – Technician Application Form (apply-tech) | ✅ Active | `/apply-tech/` page |
| `F6WKm1iddqU9yk5ehcz9` | Primary Website Contact Form – Nova Titan | ✅ Active | `/contact/` page |
| `mtSV0KHisdG4F6QD2uXA` | Form 1 | ❓ Unknown | Not embedded |

---

### Existing Form Mappings

#### 1. **Technician Application Form**
- **Form ID:** `JhTgjBW3Yvp8gvROVgVR`
- **Name:** NT – Technician Application Form (apply-tech)
- **Embedded On:** `/apply-tech/index.html`
- **Current Pipeline:** Should route to **Technician Pipeline** (`UjrPlwsCDOJzV3Obgddc`)
- **Stages:** Applied → Pending Review → Phone Screen → Screened → Test Job → Onboard → Active
- **Tags Needed:** `Technician`, `Applicant`, `West-Texas` (if applicable)
- **Status:** ✅ Properly embedded, ⚠️ pipeline routing unknown

#### 2. **Primary Website Contact Form**
- **Form ID:** `F6WKm1iddqU9yk5ehcz9`
- **Name:** Primary Website Contact Form – Nova Titan
- **Embedded On:** `/contact/index.html`
- **Current Pipeline:** Should route to **Nova Titan – Sales Pipeline** (`2URmX2LKUO11VkPWuK4m`) or **Inbound Leads** (`ZRtytixW7eqQ5NlCmKOG`)
- **Stages (Sales Pipeline):** New Lead → Discovery Call Scheduled → Discovery Call Completed → Proposal Sent → Follow-Up → Won → Lost
- **Tags Needed:** `IT-Lead`, `Website-Contact`, `Commercial`
- **Status:** ✅ Properly embedded, ⚠️ pipeline routing unknown

#### 3. **Form 1 (Unused)**
- **Form ID:** `mtSV0KHisdG4F6QD2uXA`
- **Name:** Form 1
- **Embedded On:** ❌ Not found on website
- **Status:** ❓ Unknown purpose - possibly legacy or placeholder

---

### Page-by-Page Form Audit

| Page | Current Form | Form ID | Status | Notes |
|------|--------------|---------|--------|-------|
| `/apply-tech/` | Technician Application | `JhTgjBW3Yvp8gvROVgVR` | ✅ Working | Properly embedded |
| `/contact/` | Primary Contact Form | `F6WKm1iddqU9yk5ehcz9` | ✅ Working | Properly embedded |
| `/government/` | ❌ **NONE** | N/A | ❌ **CRITICAL GAP** | **NEEDS FEDERAL BUYER FORM** |
| `/book-now/` | Calendar booking widget | `5DLi00s8H56eqRY4nVyu` | ✅ Working | Booking widget (not form) |
| `/discovery-call/` | Same booking widget | `5DLi00s8H56eqRY4nVyu` | ✅ Working | Booking widget (not form) |
| `/join-our-network/` | ❌ **NONE** | N/A | ❌ **MISSING** | Should have Subcontractor form |
| Homepage (`/`) | ❌ **NONE** | N/A | ⚠️ Optional | Could add quick contact |

---

## 🚨 CRITICAL GAPS IDENTIFIED

### 1. ❌ **Government Page - NO FORM**
**Page:** `/government/index.html`  
**Issue:** No form for federal buyers, contracting officers, or government agencies  
**Impact:** ⚠️ **HIGH** - Missing critical lead capture for government contracting  
**Required:** **Federal Buyer / Contracting Officer Inquiry Form**

**Required Fields:**
- Full Name (required)
- Agency / Organization (required)
- Email (required)
- Phone (required)
- Solicitation Number (optional)
- Contract Vehicle Interest (dropdown: Micro-purchase, Simplified Acquisition, SAM.gov Contract, Subcontractor)
- Message / Inquiry Details (required)
- How did you find us? (dropdown)

**Automation Requirements:**
- **Tag:** `Gov-Lead`, `Federal-Buyer`, `Agency-Inquiry`
- **Pipeline:** Government Bids - 2026 (`qUerNGGkJrxGZZgPdimG`)
- **Stage:** "Opportunity Identified"
- **Workflow:** Trigger internal notification to Traivone Smith
- **Custom Field:** Capture agency name, solicitation number

---

### 2. ❌ **No Subcontractor Intake Form**
**Missing Page:** `/join-our-network/` exists but has NO form  
**Issue:** No structured intake for subcontractor/vendor recruitment  
**Impact:** ⚠️ **MEDIUM-HIGH** - Missing partner recruitment capability  
**Required:** **Subcontractor / Vendor Intake Form**

**Required Fields:**
- Company Name (required)
- Contact Person (required)
- Email (required)
- Phone (required)
- Service Type / Specialization (checkbox: IT Support, Cabling, Security, Field Services, Other)
- Primary Coverage Area (text)
- NAICS Codes (optional text)
- Website (optional)
- Past Performance Summary (textarea)
- Insurance Status (dropdown: Yes - Active, In Progress, Not Yet)
- W-9 Ready? (radio: Yes / No / Will Provide)

**Automation Requirements:**
- **Tag:** `Subcontractor`, `Vendor`, `Partner-Network`
- **Pipeline:** Subcontractor Recruitment (`rdaHLhdso5IDDA9t9iPO`)
- **Stage:** "Prospecting" or "Initial Outreach"
- **Workflow:** Trigger internal review task
- **Custom Field:** Capture service types, coverage area, NAICS

---

### 3. ⚠️ **Missing Hidden Fields for UTM Tracking**
**Issue:** Forms don't capture source/campaign data  
**Impact:** Can't track lead sources or campaign ROI  
**Required:** Add hidden fields to all forms:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `referrer_url`
- `landing_page`

---

## 📊 PART 2: GHL PIPELINES DISCOVERED

### Available Pipelines for Form Routing

| Pipeline ID | Pipeline Name | Stages | Best For |
|-------------|---------------|--------|----------|
| `qUerNGGkJrxGZZgPdimG` | **Government Bids - 2026** | 9 stages | Federal buyer inquiries, gov opportunities |
| `2URmX2LKUO11VkPWuK4m` | **Nova Titan – Sales Pipeline** | 7 stages | Commercial IT leads, enterprise clients |
| `ZRtytixW7eqQ5NlCmKOG` | **Inbound Leads** | 4 stages | General inquiries, quick routing |
| `rdaHLhdso5IDDA9t9iPO` | **Subcontractor Recruitment** | 7 stages | Vendor/partner intake |
| `UjrPlwsCDOJzV3Obgddc` | **Technician Pipeline** | 7 stages | Field tech applicants |

---

### Recommended Form → Pipeline Mapping

| Form | Pipeline | First Stage | Tags |
|------|----------|-------------|------|
| **Federal Buyer Form** (NEW) | Government Bids - 2026 | Opportunity Identified | `Gov-Lead`, `Federal`, `Agency` |
| **Subcontractor Form** (NEW) | Subcontractor Recruitment | Prospecting | `Subcontractor`, `Vendor`, `Partner` |
| **IT/Commercial Form** (Existing) | Nova Titan – Sales Pipeline | New Lead | `IT-Lead`, `Commercial`, `Website` |
| **Technician Form** (Existing) | Technician Pipeline | Applied | `Technician`, `Applicant` |
| **General Contact** (Existing) | Inbound Leads | New leads | `Contact`, `Inquiry` |

---

## ✅ PART 3: IMPLEMENTATION PLAN

### Phase 1: Create Missing Forms in GHL (API)

Due to GHL API limitations (some routes not supported by IAM), forms will be created manually in GHL UI, then embedded using API-retrieved IDs.

**Forms to Create:**
1. **Federal Buyer / Contracting Officer Inquiry Form**
   - Name: "NT – Federal Buyer Inquiry (government page)"
   - Location: Government page
   - Pipeline: Government Bids - 2026
   - Tags: Gov-Lead, Federal-Buyer

2. **Subcontractor / Vendor Intake Form**
   - Name: "NT – Subcontractor Intake (join-our-network)"
   - Location: Join Our Network page
   - Pipeline: Subcontractor Recruitment
   - Tags: Subcontractor, Vendor

3. **Optional: Quick Quote / IT Services Form**
   - Name: "NT – IT Services Quote Request"
   - Pipeline: Nova Titan – Sales Pipeline
   - Tags: IT-Lead, Quote-Request

---

### Phase 2: Update Existing Forms

**Updates Needed for ALL forms:**
1. Add hidden fields for UTM tracking
2. Configure correct pipeline routing
3. Add proper tags
4. Set up workflows (notifications, tasks)
5. Ensure mobile responsiveness
6. Dark theme compatibility

---

### Phase 3: Embed Forms on Website

**Government Page (`/government/index.html`):**
```html
<!-- Add near "Contact Information" section around line 671 -->
<section class="content py-16">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-4xl font-bold text-cyan-300 glow mb-8 text-center">
      Federal Buyer Inquiry
    </h2>
    <div class="card rounded-xl p-8">
      <p class="text-gray-300 mb-6 text-center">
        Contracting officers and federal buyers: Contact us about your IT infrastructure needs.
      </p>
      <div class="ghl-form-container">
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/{FORM_ID_HERE}"
          style="width:100%;height:100%;border:none;border-radius:8px"
          id="inline-federal-buyer-form"
          data-layout="{'id':'INLINE'}"
          title="Federal Buyer Inquiry Form">
        </iframe>
        <script src="https://link.msgsndr.com/js/form_embed.js"></script>
      </div>
    </div>
  </div>
</section>
```

**Join Our Network Page (`/join-our-network/index.html`):**
```html
<!-- Add subcontractor form embed -->
<section class="content py-16">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-4xl font-bold text-cyan-300 glow mb-8 text-center">
      Join Our Subcontractor Network
    </h2>
    <div class="card rounded-xl p-8">
      <div class="ghl-form-container">
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/{FORM_ID_HERE}"
          style="width:100%;height:100%;border:none;border-radius:8px"
          id="inline-subcontractor-form"
          data-layout="{'id':'INLINE'}"
          title="Subcontractor Intake Form">
        </iframe>
        <script src="https://link.msgsndr.com/js/form_embed.js"></script>
      </div>
    </div>
  </div>
</section>
```

---

### Phase 4: Security & Best Practices

**✅ Security Checklist:**
- [x] API key stored securely (not in repo)
- [x] Location ID not hardcoded in public files
- [x] Form embeds use public-safe iframe method
- [ ] Add rate limiting to prevent form spam
- [ ] Implement CAPTCHA or honeypot fields
- [ ] Sanitize all form inputs server-side

**✅ Best Practices:**
- [x] Mobile-responsive embeds
- [ ] Dark theme compatibility testing
- [ ] Form load performance optimization
- [ ] Error handling and fallback messages
- [ ] Thank you page redirects configured

---

## 📈 PART 4: TESTING REQUIREMENTS

### End-to-End Test Scenarios

| Form | Test Scenario | Expected Outcome |
|------|---------------|------------------|
| Federal Buyer | Submit with agency "DoD" | → Government Bids pipeline, "Opportunity Identified" stage, tags applied |
| Subcontractor | Submit with services "IT Support, Cabling" | → Subcontractor Recruitment pipeline, "Prospecting" stage, tags applied |
| IT/Commercial | Submit from website contact page | → Sales Pipeline, "New Lead" stage, notification sent |
| Technician | Submit application | → Technician Pipeline, "Applied" stage, workflow triggered |

---

## 📊 PART 5: FORM & AUTOMATION MAP

### Complete Form Ecosystem

```
WEBSITE FORMS:
├── Contact Page (/contact/)
│   ├── Form: Primary Website Contact Form
│   ├── ID: F6WKm1iddqU9yk5ehcz9
│   ├── Pipeline: Nova Titan – Sales Pipeline
│   ├── Stage: New Lead
│   └── Tags: IT-Lead, Website-Contact, Commercial
│
├── Government Page (/government/) [NEW - TO BE ADDED]
│   ├── Form: Federal Buyer Inquiry Form
│   ├── ID: [TO BE CREATED]
│   ├── Pipeline: Government Bids - 2026
│   ├── Stage: Opportunity Identified
│   └── Tags: Gov-Lead, Federal-Buyer, Agency-Inquiry
│
├── Join Network (/join-our-network/) [NEW - TO BE ADDED]
│   ├── Form: Subcontractor Intake Form
│   ├── ID: [TO BE CREATED]
│   ├── Pipeline: Subcontractor Recruitment
│   ├── Stage: Prospecting
│   └── Tags: Subcontractor, Vendor, Partner-Network
│
└── Apply Tech (/apply-tech/)
    ├── Form: Technician Application Form
    ├── ID: JhTgjBW3Yvp8gvROVgVR
    ├── Pipeline: Technician Pipeline
    ├── Stage: Applied
    └── Tags: Technician, Applicant, Field-Tech
```

---

## 🚀 NEXT STEPS

### Immediate Actions (Priority 1)
1. ✅ Complete audit documentation
2. ⏳ Create Federal Buyer Inquiry form in GHL UI
3. ⏳ Create Subcontractor Intake form in GHL UI
4. ⏳ Retrieve new form IDs via API
5. ⏳ Embed forms on government and join-our-network pages
6. ⏳ Configure pipeline routing and tags
7. ⏳ Test all forms end-to-end

### Follow-Up Actions (Priority 2)
- Add UTM hidden fields to all forms
- Set up workflow automations
- Configure notification emails
- Create thank you pages for each form
- Implement form analytics tracking
- Add form completion rate monitoring

---

## 📞 SUPPORT & DOCUMENTATION

**GHL API Documentation:** https://highlevel.stoplight.io/  
**Location ID:** l9FXVehNOazAR0Uexx8J  
**API Token:** [Stored securely - not in repo]  

**Internal Contact:**
- **Owner:** Traivone Smith
- **Email:** info@novatitan.net
- **Phone:** (806) 370-0624

---

**END OF AUDIT DOCUMENT**

*Last Updated: December 11, 2024*
