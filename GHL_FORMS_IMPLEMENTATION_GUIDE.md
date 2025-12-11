# 🚀 GHL FORMS IMPLEMENTATION GUIDE

**Date:** December 11, 2024  
**Status:** Ready for Implementation  
**Priority:** HIGH

---

## 📋 OVERVIEW

This guide provides step-by-step instructions to complete the GHL forms integration for Nova Titan Systems. Due to GHL API IAM restrictions, some steps must be completed in the GHL UI, but this guide provides all necessary specifications.

---

## ✅ CAPABILITY STATEMENT STATUS

### Current Capability Statements
1. **Primary:** `/assets/docs/nova-titan-systems-federal-capability-statement.pdf` (197KB, Dec 1, 2024)
2. **Alternate:** `/assets/capability-statement/novatitan-capability-statement.pdf` (385KB, Nov 22, 2024)

### ⚠️ ACTION REQUIRED: Update Capability Statement

**Why Update Needed:**
The capability statement PDF must be updated to reflect the removal of manufacturing NAICS codes (334118, 334290) that were removed from the website on December 11, 2024.

**Current NAICS Codes (Correct):**
- **Primary:** 541519 - Other Computer Related Services
- **Additional:**
  - 238210 - Electrical Contractors
  - 238990 - All Other Specialty Trade Contractors
  - 541512 - Computer Systems Design Services
  - 541513 - Computer Facilities Management Services
  - 541611 - Administrative Management Consulting
  - 541690 - Other Scientific and Technical Consulting
  - 561621 - Security Systems Services

**NAICS Codes to REMOVE from PDF:**
- ❌ 334118 - Computer Terminal Equipment Manufacturing
- ❌ 334290 - Other Communications Equipment Manufacturing

**How to Update:**
1. Open the source file for the capability statement
2. Remove the two manufacturing NAICS codes listed above
3. Ensure only the 8 service-based NAICS codes remain
4. Save as PDF
5. Replace both PDFs in `/assets/docs/` and `/assets/capability-statement/`
6. Verify all download links work correctly

**Download Links to Test After Update:**
- Homepage: 2 instances of capability statement link
- Government page: 1 instance
- Footer: 1 instance

---

## 🎯 STEP 1: CREATE FEDERAL BUYER INQUIRY FORM IN GHL

### Form Specifications

**Form Name:** `NT – Federal Buyer Inquiry (government)`

**Fields Configuration:**

| Field Name | Type | Required | Placeholder/Options |
|------------|------|----------|---------------------|
| Full Name | Text | Yes | "John Smith" |
| Title/Role | Text | No | "Contracting Officer" |
| Agency/Organization | Text | Yes | "Department of Defense" |
| Email Address | Email | Yes | "john.smith@agency.gov" |
| Phone Number | Phone | Yes | "(555) 123-4567" |
| Solicitation Number | Text | No | "W912xx-25-Q-0001 (if applicable)" |
| Contract Vehicle Interest | Dropdown | Yes | • Micro-purchase ($10K or less)<br>• Simplified Acquisition ($10K-$250K)<br>• Full & Open Competition<br>• Subcontractor Opportunity<br>• Other |
| Service Area of Interest | Checkbox | No | • IT Infrastructure<br>• Cybersecurity<br>• Network Installation<br>• Field Services<br>• Managed IT Support<br>• Cloud Solutions |
| Message/Inquiry Details | Textarea | Yes | "Tell us about your IT infrastructure needs..." |
| How did you find us? | Dropdown | No | • SAM.gov Search<br>• Agency Referral<br>• Google Search<br>• LinkedIn<br>• Industry Event<br>• Other |

**Hidden Fields (UTM Tracking):**
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `page_url` (auto-populate: https://novatitan.net/government/)
- `referrer`

### Form Settings

**Pipeline Configuration:**
- **Pipeline:** Government Bids - 2026
- **Pipeline ID:** qUerNGGkJrxGZZgPdimG
- **Stage:** Opportunity Identified (first stage)

**Tags to Apply:**
- `Gov-Lead`
- `Federal-Buyer`
- `Website-Government-Page`
- `Agency-Inquiry`

**Notifications:**
- Send email to: info@novatitan.net
- Subject: "🚨 NEW Federal Buyer Inquiry from {Full Name}"
- Include all form fields in notification

**Redirect After Submission:**
- URL: https://novatitan.net/thank-you/
- Or create: https://novatitan.net/thank-you/government/

**Custom Fields to Create (if not exist):**
- `agency_name` (text)
- `solicitation_number` (text)
- `contract_vehicle` (text)
- `service_interests` (text)

---

## 🎯 STEP 2: CREATE SUBCONTRACTOR INTAKE FORM IN GHL

### Form Specifications

**Form Name:** `NT – Subcontractor Intake (join-our-network)`

**Fields Configuration:**

| Field Name | Type | Required | Placeholder/Options |
|------------|------|----------|---------------------|
| Company Name | Text | Yes | "ABC Technology Services LLC" |
| Contact Person | Text | Yes | "Jane Doe" |
| Title | Text | No | "Owner / Operations Manager" |
| Email Address | Email | Yes | "contact@company.com" |
| Phone Number | Phone | Yes | "(555) 123-4567" |
| Company Website | URL | No | "https://www.company.com" |
| Service Specialization | Checkbox | Yes | • IT Support & Help Desk<br>• Network Cabling (Cat5e/Cat6/Fiber)<br>• Security Systems<br>• Field Installation Services<br>• Smart Hands / Remote Hands<br>• Equipment Deployment<br>• Other (specify) |
| Primary Coverage Area | Text | Yes | "West Texas, Lubbock, Amarillo, etc." |
| NAICS Codes | Text | No | "541519, 238210 (if known)" |
| Years in Business | Dropdown | No | • Less than 1 year<br>• 1-3 years<br>• 3-5 years<br>• 5-10 years<br>• 10+ years |
| Past Performance Summary | Textarea | No | "Briefly describe relevant project experience..." |
| General Liability Insurance | Radio | Yes | • Yes - Active<br>• In Progress<br>• Not Yet |
| W-9 Available | Radio | Yes | • Yes - Ready to Provide<br>• Will Provide Upon Request<br>• Not Yet Prepared |
| How did you hear about us? | Dropdown | No | • SAM.gov<br>• Industry Referral<br>• Google Search<br>• LinkedIn<br>• Subcontractor Directory<br>• Other |

**Hidden Fields (UTM Tracking):**
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `page_url` (auto-populate: https://novatitan.net/join-our-network/)
- `referrer`

### Form Settings

**Pipeline Configuration:**
- **Pipeline:** Subcontractor Recruitment
- **Pipeline ID:** rdaHLhdso5IDDA9t9iPO
- **Stage:** Prospecting (first stage)

**Tags to Apply:**
- `Subcontractor`
- `Vendor-Network`
- `Partner-Intake`
- `Website-Join-Network`

**Notifications:**
- Send email to: info@novatitan.net
- Subject: "🤝 NEW Subcontractor Application from {Company Name}"
- Include all form fields in notification

**Workflow Trigger:**
- Create internal task: "Review Subcontractor Application - {Company Name}"
- Assign to: Traivone Smith
- Due: 3 days

**Custom Fields to Create (if not exist):**
- `company_name` (text)
- `service_types` (multi-select)
- `coverage_area` (text)
- `naics_codes` (text)
- `insurance_status` (text)
- `w9_status` (text)

---

## 🎯 STEP 3: UPDATE EXISTING FORMS

### A. Technician Application Form (JhTgjBW3Yvp8gvROVgVR)

**Current Status:** ✅ Embedded on `/apply-tech/`

**Updates Needed:**
1. Add hidden UTM fields
2. Verify pipeline routing to: Technician Pipeline (UjrPlwsCDOJzV3Obgddc)
3. Ensure tags applied: `Technician`, `Applicant`, `Field-Tech`
4. Verify stage: "Applied"

### B. Primary Contact Form (F6WKm1iddqU9yk5ehcz9)

**Current Status:** ✅ Embedded on `/contact/`

**Updates Needed:**
1. Add hidden UTM fields
2. Verify pipeline routing to: Nova Titan – Sales Pipeline (2URmX2LKUO11VkPWuK4m)
3. Ensure tags applied: `IT-Lead`, `Commercial`, `Website-Contact`
4. Verify stage: "New Lead"
5. Update form name from "Form 0" to something descriptive

---

## 🎯 STEP 4: RETRIEVE NEW FORM IDs VIA API

After creating forms in GHL UI, run this command to get the new form IDs:

```bash
curl -X GET "https://services.leadconnectorhq.com/forms/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_TOKEN}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json"
```

**Look for:**
- Form name containing "Federal Buyer" → Note the ID
- Form name containing "Subcontractor" → Note the ID

---

## 🎯 STEP 5: EMBED FORMS ON WEBSITE

### A. Add Federal Buyer Form to Government Page

**File:** `/government/index.html`

**Location:** After the "Commercial Past Performance" section (around line 670)

**Code to Add:**

```html
<!-- FEDERAL BUYER INQUIRY FORM -->
<section class="content py-16 bg-gray-900/50">
  <div class="max-w-4xl mx-auto px-6">
    <div class="text-center mb-12">
      <span class="inline-block px-4 py-2 bg-cyan-900/30 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-mono mb-6">
        <i class="fas fa-file-contract mr-2"></i>Federal Procurement Inquiry
      </span>
      <h2 class="text-4xl font-bold text-cyan-300 glow mb-6">
        Contact Us About Your IT Needs
      </h2>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
        Contracting officers and federal buyers: We're ready to support your agency's IT infrastructure requirements.
      </p>
      <p class="text-sm text-gray-400">
        <i class="fas fa-clock mr-2"></i>Response within 24 hours for all federal inquiries
      </p>
    </div>

    <div class="card rounded-xl p-8">
      <!-- Federal Buyer Inquiry Form -->
      <div class="ghl-form-container">
        <div class="form-header-decoration">
          <div class="decoration-line"></div>
          <div class="decoration-icon">
            <i class="fas fa-landmark text-cyan-400"></i>
          </div>
          <div class="decoration-line"></div>
        </div>

        <div class="ghl-form-wrapper">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/[FEDERAL_BUYER_FORM_ID]"
            style="width:100%;height:100%;border:none;border-radius:8px"
            id="inline-federal-buyer-form" 
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="NT – Federal Buyer Inquiry"
            data-height="1200"
            data-layout-iframe-id="inline-federal-buyer-form"
            data-form-id="[FEDERAL_BUYER_FORM_ID]"
            title="Federal Buyer Inquiry Form">
          </iframe>
        </div>

        <div class="form-footer-decoration">
          <div class="security-badge">
            <i class="fas fa-shield-alt mr-2 text-green-400"></i>
            <span class="text-sm text-gray-400">Secure Submission</span>
          </div>
          <div class="privacy-badge">
            <i class="fas fa-lock mr-2 text-cyan-400"></i>
            <span class="text-sm text-gray-400">Information Protected</span>
          </div>
        </div>
      </div>

      <p class="mt-6 text-sm text-gray-400 text-center">
        <i class="fas fa-info-circle mr-1"></i>
        Prefer email? Contact us directly at 
        <a href="mailto:info@novatitan.net" class="text-cyan-300 hover:text-cyan-400">info@novatitan.net</a> 
        or call <a href="tel:+18063700624" class="text-green-300 hover:text-green-400">(806) 370-0624</a>
      </p>
    </div>
  </div>
</section>

<script src="https://link.msgsndr.com/js/form_embed.js"></script>

<style>
  /* Form Container Styling */
  .ghl-form-container {
    background: linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%);
    border: 2px solid rgba(0, 212, 255, 0.2);
    border-radius: 16px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .ghl-form-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%);
    animation: rotate-glow 20s linear infinite;
    pointer-events: none;
  }

  @keyframes rotate-glow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .form-header-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    gap: 1rem;
    position: relative;
    z-index: 1;
  }

  .decoration-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.5) 50%, transparent 100%);
  }

  .decoration-icon {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 212, 255, 0.1);
    border: 2px solid rgba(0, 212, 255, 0.3);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }

  .ghl-form-wrapper {
    min-height: 1200px;
    position: relative;
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 1rem;
  }

  .form-footer-decoration {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 212, 255, 0.2);
    position: relative;
    z-index: 1;
  }

  .security-badge,
  .privacy-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 212, 255, 0.05);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    .ghl-form-container {
      padding: 1rem;
    }
    .form-footer-decoration {
      flex-direction: column;
      gap: 1rem;
    }
    .ghl-form-wrapper {
      min-height: 1400px;
    }
  }
</style>
```

**Replace `[FEDERAL_BUYER_FORM_ID]` with the actual form ID from Step 4.**

---

### B. Create Subcontractor Page with Form

**File:** `/join-our-network/index.html`

**Replace entire file content with:**

```html
---
layout: default
title: "Join Our Subcontractor Network | Partner Opportunities | Nova Titan Systems"
description: "Join Nova Titan Systems' subcontractor network for federal and commercial IT projects. Prime contractor opportunities for qualified vendors, technicians, and service providers across West Texas and nationwide."
---

<section class="content pt-32 pb-16">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-2 bg-purple-900/30 border border-purple-400/30 rounded-full text-purple-300 text-sm font-mono mb-6">
        <i class="fas fa-handshake mr-2"></i>Partner Network Opportunities
      </span>
      <h1 class="text-4xl sm:text-6xl font-bold text-cyan-300 glow mb-6">
        Join Our Subcontractor Network
      </h1>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Nova Titan Systems is building a nationwide network of qualified subcontractors for federal, state, 
        and commercial IT infrastructure projects. Join our partner ecosystem.
      </p>
      <div class="flex items-center justify-center gap-4 text-sm text-gray-400">
        <span><i class="fas fa-briefcase text-purple-400 mr-2"></i>Prime Contractor Opportunities</span>
        <span><i class="fas fa-dollar-sign text-green-400 mr-2"></i>Fair Compensation</span>
        <span><i class="fas fa-chart-line text-cyan-400 mr-2"></i>Growth Potential</span>
      </div>
    </div>

    <!-- Why Partner With Us -->
    <div class="card rounded-xl p-12 mb-12">
      <h2 class="text-3xl font-bold text-cyan-300 glow mb-8 text-center">
        <i class="fas fa-star mr-3"></i>Why Partner With Nova Titan Systems?
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="text-5xl text-green-400 mb-4"><i class="fas fa-file-contract"></i></div>
          <h3 class="text-xl font-bold text-white mb-3">Federal Opportunities</h3>
          <p class="text-gray-400">Access federal contracts through our SAM.gov Active prime contractor status. We handle procurement compliance while you deliver services.</p>
        </div>
        <div class="text-center">
          <div class="text-5xl text-cyan-400 mb-4"><i class="fas fa-network-wired"></i></div>
          <h3 class="text-xl font-bold text-white mb-3">Steady Work Flow</h3>
          <p class="text-gray-400">Join a growing network of IT projects across West Texas and nationwide. Consistent project opportunities with professional oversight.</p>
        </div>
        <div class="text-center">
          <div class="text-5xl text-purple-400 mb-4"><i class="fas fa-users"></i></div>
          <h3 class="text-xl font-bold text-white mb-3">Professional Support</h3>
          <p class="text-gray-400">Nova Titan provides project management, QA oversight, and administrative support. Focus on technical delivery.</p>
        </div>
      </div>
    </div>

    <!-- Our Execution Model -->
    <div class="card rounded-xl p-12 mb-12">
      <h2 class="text-3xl font-bold text-cyan-300 glow mb-8 text-center">
        Prime + Subcontractor Delivery Model
      </h2>
      <div class="space-y-4 text-gray-300 text-lg max-w-4xl mx-auto">
        <p>
          <strong class="text-cyan-300">Nova Titan Systems acts as the Prime Contractor</strong>, securing federal, state, 
          and commercial contracts. We then coordinate with qualified subcontractors to deliver services nationwide.
        </p>
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div class="bg-gray-800/50 rounded p-6 border-l-4 border-cyan-400">
            <h3 class="text-xl font-bold text-cyan-300 mb-3">Nova Titan Provides:</h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><i class="fas fa-check text-green-400 mr-2"></i>Prime contract management</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Compliance & procurement handling</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Project oversight & QA</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Payment processing & invoicing</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Client relationship management</li>
            </ul>
          </div>
          <div class="bg-gray-800/50 rounded p-6 border-l-4 border-purple-400">
            <h3 class="text-xl font-bold text-purple-300 mb-3">Subcontractors Provide:</h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><i class="fas fa-check text-green-400 mr-2"></i>Technical service delivery</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Field installation & support</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Specialized expertise (cabling, security, IT)</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Coverage in your geographic area</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Quality workmanship & professionalism</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Types We Need -->
    <div class="card rounded-xl p-12 mb-12">
      <h2 class="text-3xl font-bold text-cyan-300 glow mb-8 text-center">
        <i class="fas fa-tools mr-3"></i>Service Types We're Looking For
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-800/50 rounded-lg p-6 border-2 border-cyan-400/20">
          <div class="text-3xl text-cyan-400 mb-3"><i class="fas fa-network-wired"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Network & Cabling</h3>
          <p class="text-sm text-gray-400">Structured cabling (Cat5e/Cat6/fiber), patch panel termination, WiFi deployment</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border-2 border-purple-400/20">
          <div class="text-3xl text-purple-400 mb-3"><i class="fas fa-shield-alt"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Security Systems</h3>
          <p class="text-sm text-gray-400">Access control, surveillance cameras, intrusion detection, physical security</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border-2 border-green-400/20">
          <div class="text-3xl text-green-400 mb-3"><i class="fas fa-server"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">IT Support & Deployment</h3>
          <p class="text-sm text-gray-400">Hardware deployment, workstation setup, server installation, help desk support</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border-2 border-orange-400/20">
          <div class="text-3xl text-orange-400 mb-3"><i class="fas fa-wrench"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Field Services & Smart Hands</h3>
          <p class="text-sm text-gray-400">On-site technical support, equipment installation, remote hands, site surveys</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border-2 border-blue-400/20">
          <div class="text-3xl text-blue-400 mb-3"><i class="fas fa-cloud"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Cloud & Infrastructure</h3>
          <p class="text-sm text-gray-400">Cloud migration, virtualization, data center services, backup solutions</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border-2 border-red-400/20">
          <div class="text-3xl text-red-400 mb-3"><i class="fas fa-laptop-code"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Specialized IT Services</h3>
          <p class="text-sm text-gray-400">Cybersecurity, network engineering, systems integration, custom solutions</p>
        </div>
      </div>
    </div>

    <!-- Requirements -->
    <div class="card rounded-xl p-12 mb-12">
      <h2 class="text-3xl font-bold text-cyan-300 glow mb-8 text-center">
        <i class="fas fa-clipboard-check mr-3"></i>Subcontractor Requirements
      </h2>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <h3 class="text-xl font-bold text-purple-300 mb-4">Essential Requirements</h3>
          <ul class="text-gray-300 space-y-3">
            <li><i class="fas fa-check text-green-400 mr-3"></i>Legally registered business entity (LLC, Corp, Sole Prop)</li>
            <li><i class="fas fa-check text-green-400 mr-3"></i>General liability insurance (required for most projects)</li>
            <li><i class="fas fa-check text-green-400 mr-3"></i>W-9 form available for tax reporting</li>
            <li><i class="fas fa-check text-green-400 mr-3"></i>Proven technical expertise in your service area</li>
            <li><i class="fas fa-check text-green-400 mr-3"></i>Professional communication & reliability</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold text-purple-300 mb-4">Preferred Qualifications</h3>
          <ul class="text-gray-300 space-y-3">
            <li><i class="fas fa-star text-yellow-400 mr-3"></i>Relevant certifications (CompTIA, Cisco, vendor certs)</li>
            <li><i class="fas fa-star text-yellow-400 mr-3"></i>Past performance with federal or state agencies</li>
            <li><i class="fas fa-star text-yellow-400 mr-3"></i>SAM.gov registration (bonus, not required)</li>
            <li><i class="fas fa-star text-yellow-400 mr-3"></i>Coverage in multiple geographic regions</li>
            <li><i class="fas fa-star text-yellow-400 mr-3"></i>Diverse service offerings</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Subcontractor Intake Form -->
    <div class="card rounded-xl p-12">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-cyan-300 glow mb-6">
          Apply to Join Our Network
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
          Complete the form below to be considered for our subcontractor network. We'll review your application 
          and reach out within 2-3 business days.
        </p>
        <p class="text-sm text-gray-400">
          <i class="fas fa-clock mr-2"></i>Application review time: 2-3 business days
        </p>
      </div>

      <!-- GHL Subcontractor Form -->
      <div class="ghl-form-container">
        <div class="form-header-decoration">
          <div class="decoration-line"></div>
          <div class="decoration-icon">
            <i class="fas fa-handshake text-purple-400"></i>
          </div>
          <div class="decoration-line"></div>
        </div>

        <div class="ghl-form-wrapper">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/[SUBCONTRACTOR_FORM_ID]"
            style="width:100%;height:100%;border:none;border-radius:8px"
            id="inline-subcontractor-form" 
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="NT – Subcontractor Intake"
            data-height="1400"
            data-layout-iframe-id="inline-subcontractor-form"
            data-form-id="[SUBCONTRACTOR_FORM_ID]"
            title="Subcontractor Intake Form">
          </iframe>
        </div>

        <div class="form-footer-decoration">
          <div class="security-badge">
            <i class="fas fa-shield-alt mr-2 text-green-400"></i>
            <span class="text-sm text-gray-400">Secure Application</span>
          </div>
          <div class="privacy-badge">
            <i class="fas fa-lock mr-2 text-purple-400"></i>
            <span class="text-sm text-gray-400">Information Confidential</span>
          </div>
        </div>
      </div>

      <p class="mt-6 text-sm text-gray-400 text-center">
        <i class="fas fa-info-circle mr-1"></i>
        Questions about partnership opportunities? Email 
        <a href="mailto:info@novatitan.net" class="text-cyan-300 hover:text-cyan-400">info@novatitan.net</a> 
        or call <a href="tel:+18063700624" class="text-green-300 hover:text-green-400">(806) 370-0624</a>
      </p>
    </div>

    <!-- Benefits -->
    <div class="text-center mt-16 text-gray-400">
      <p class="mb-2">Join a growing network of IT professionals delivering quality services nationwide.</p>
      <p class="text-sm">
        Nova Titan Systems LLC | SAM.gov Active Prime Contractor | UEI: CZ8BLZMSKZ66
      </p>
    </div>
  </div>
</section>

<script src="https://link.msgsndr.com/js/form_embed.js"></script>

<style>
  /* Form Container Styling - Same as government page */
  .ghl-form-container {
    background: linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%);
    border: 2px solid rgba(0, 212, 255, 0.2);
    border-radius: 16px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .ghl-form-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%);
    animation: rotate-glow 20s linear infinite;
    pointer-events: none;
  }

  @keyframes rotate-glow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .form-header-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    gap: 1rem;
    position: relative;
    z-index: 1;
  }

  .decoration-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.5) 50%, transparent 100%);
  }

  .decoration-icon {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 212, 255, 0.1);
    border: 2px solid rgba(0, 212, 255, 0.3);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }

  .ghl-form-wrapper {
    min-height: 1400px;
    position: relative;
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 1rem;
  }

  .form-footer-decoration {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 212, 255, 0.2);
    position: relative;
    z-index: 1;
  }

  .security-badge,
  .privacy-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 212, 255, 0.05);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    .ghl-form-container {
      padding: 1rem;
    }
    .form-footer-decoration {
      flex-direction: column;
      gap: 1rem;
    }
    .ghl-form-wrapper {
      min-height: 1600px;
    }
  }
</style>
```

**Replace `[SUBCONTRACTOR_FORM_ID]` with the actual form ID from Step 4.**

---

## 🎯 STEP 6: QUICK REFERENCE - FORM IDs TO UPDATE

After creating forms in GHL, update these files with the correct form IDs:

| File | Line/Section | Placeholder | Replace With |
|------|--------------|-------------|--------------|
| `/government/index.html` | Federal Buyer Form section | `[FEDERAL_BUYER_FORM_ID]` | Actual form ID from GHL |
| `/join-our-network/index.html` | Subcontractor Form section | `[SUBCONTRACTOR_FORM_ID]` | Actual form ID from GHL |

**Search & Replace:**
```bash
# After getting form IDs, run these commands:
cd /home/user/webapp

# Replace Federal Buyer form ID
sed -i 's/\[FEDERAL_BUYER_FORM_ID\]/YOUR_ACTUAL_FORM_ID/g' government/index.html

# Replace Subcontractor form ID
sed -i 's/\[SUBCONTRACTOR_FORM_ID\]/YOUR_ACTUAL_FORM_ID/g' join-our-network/index.html
```

---

## 🎯 STEP 7: TEST ALL FORMS

### Testing Checklist

| Form | Test Item | Expected Result |
|------|-----------|-----------------|
| **Federal Buyer** | Submit test inquiry | → Lands in "Government Bids - 2026" pipeline, "Opportunity Identified" stage |
| **Federal Buyer** | Check tags | → `Gov-Lead`, `Federal-Buyer`, `Website-Government-Page` applied |
| **Federal Buyer** | Check notification | → Email sent to info@novatitan.net |
| **Subcontractor** | Submit test application | → Lands in "Subcontractor Recruitment" pipeline, "Prospecting" stage |
| **Subcontractor** | Check tags | → `Subcontractor`, `Vendor-Network`, `Partner-Intake` applied |
| **Subcontractor** | Check workflow | → Internal review task created |
| **IT/Commercial** | Submit from /contact/ | → Lands in "Nova Titan – Sales Pipeline", "New Lead" stage |
| **Technician** | Submit from /apply-tech/ | → Lands in "Technician Pipeline", "Applied" stage |

### Mobile Responsiveness Test
- [ ] Test all forms on iPhone/Android
- [ ] Verify forms load correctly
- [ ] Check submit buttons work
- [ ] Confirm thank you page redirect

### Dark Theme Compatibility
- [ ] Forms render correctly in dark theme
- [ ] Text is readable
- [ ] Buttons are visible
- [ ] No color contrast issues

---

## 📊 SUCCESS METRICS

After implementation, track:
- **Form Submission Rate:** % of page visitors who submit
- **Lead Quality:** % of submissions that become qualified opportunities
- **Pipeline Conversion:** % that move through pipeline stages
- **Response Time:** Time from submission to first contact

---

## ✅ FINAL CHECKLIST

- [ ] Federal Buyer form created in GHL
- [ ] Subcontractor form created in GHL
- [ ] Form IDs retrieved via API
- [ ] Forms embedded on government page
- [ ] Forms embedded on join-our-network page
- [ ] Pipeline routing configured correctly
- [ ] Tags applied to all forms
- [ ] Hidden UTM fields added
- [ ] Workflows/notifications set up
- [ ] All forms tested end-to-end
- [ ] Mobile responsiveness verified
- [ ] Capability statement PDF updated (remove manufacturing NAICS)
- [ ] All download links tested
- [ ] Documentation updated

---

**Implementation Status:** 🟡 READY FOR FORM CREATION IN GHL UI

**Next Action:** Create the two new forms in GHL UI using specifications above, then retrieve IDs and embed.

---

**END OF IMPLEMENTATION GUIDE**

*Last Updated: December 11, 2024*
