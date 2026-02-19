# Nova Titan Pricing Review - February 13, 2026

**Page Reviewed:** `/services/index.html`  
**Current Status:** Pricing displayed but needs optimization

---

## 🎯 Current Pricing Structure

### 1. Infrastructure & Installations
**Residential Services:**
- ✅ TV Mounting: Starting at $99 (good)
- ⚠️ Smart Home Setup: $150-300 (feels capped/limiting)

**Commercial Projects:** Custom Quote

### 2. Managed Technology & Support
**Residential Support:**
- ✅ Remote Support: $75/hour (clear)

**Business Plans:** Custom Quote

### 3. Cloud & Security Strategy
**Residential Security:**
- ✅ Home WiFi Security Audit: $149 (good)

**Enterprise Security:** Custom Quote

---

## ⚠️ Issues Identified

### Issue #1: Smart Home Setup Cap ($150-300)
**Problem:**  
- Range feels artificially limited
- Full smart home setups can easily be $500-$2,000+
- Customers with bigger projects might self-disqualify
- Doesn't account for complexity (3 devices vs. 15 devices)

**Impact:** Lost revenue from larger smart home projects

**User Feedback:** "I feel like it's capping off the home setup"

---

### Issue #2: No Price Anchors for Commercial
**Problem:**  
- "Custom Quote" for all commercial services
- No reference pricing or starting points
- Commercial customers can't gauge budget

**Impact:** Higher bounce rate, lost commercial leads

---

### Issue #3: Mixed Residential/Commercial Pricing
**Problem:**  
- Same service card mixes residential flat rates + commercial "custom quote"
- Can be confusing for users
- Not clear segmentation

**Impact:** User confusion, unclear value proposition

---

### Issue #4: Missing Service Pricing
**Problem:**  
- No pricing for: Security cameras, Network deployment, Cabling
- Customers don't know what to expect
- Forces everyone to contact for quote

**Impact:** Friction in customer journey, lost self-service opportunities

---

## ✅ Recommended Pricing Updates

### Option A: Expanded Smart Home Pricing (Recommended)
Replace `$150-300` with tiered approach:

```
Smart Home Setup:
• Basic (1-3 devices): Starting at $150
• Standard (4-8 devices): Starting at $300
• Complete (9+ devices): Starting at $500+
```

**Benefits:** Clearer expectations, accommodates larger projects, sets proper value

---

### Option B: Starting Price Only
Replace `$150-300` with:
```
Smart Home Setup: Starting at $150
```

**Benefits:** Simpler, doesn't cap expectations, flexible

---

### Option C: Custom Quote with Range
Replace `$150-300` with:
```
Smart Home Setup: Custom Quote
Typical projects: $150-$1,500
```

**Benefits:** Flexible, shows realistic range, invites conversation

---

## 📊 Complete Revised Pricing (RECOMMENDED)

### 🔧 Infrastructure & Installations

**Residential Services:**
- TV Mounting: **Starting at $99**
- Smart Home Setup (Basic): **Starting at $150**
- Smart Home Setup (Complete): **Starting at $500**
- Security Camera Cabling (1-4 runs): **Starting at $299** *(infrastructure cabling only; device installation via licensed partners)*
- Network Setup (Home WiFi): **Starting at $199**

**Commercial Projects:**
- Business Network Setup: **Starting at $1,499**
- POS System Integration: **Starting at $999**
- Complete Business Startup: **Starting at $2,999**
- Multi-Site Deployment: **Custom Quote**

---

### 💻 Managed Technology & Support

**Residential Support:**
- Remote Support (hourly): **$75/hour**
- Remote Support (4-hour block): **$275** (save $25)

**Business Plans:** (add starting prices)
- Basic Monitoring (1-5 devices): **Starting at $99/month**
- Business Support (6-15 devices): **Starting at $299/month**
- Enterprise Support: **Custom Quote**

---

### ☁️ Cloud & Security Strategy

**Residential Security:**
- Home WiFi Security Audit: **$149**
- Smart Home Security Review: **Starting at $199**
- Personal Cloud Security Check: **$249**

**Business Security:**
- Small Business Security Audit: **Starting at $499**
- Cloud Infrastructure Review (AWS/Azure): **Starting at $999**
- Compliance Assessment: **Starting at $1,499**
- Enterprise Security: **Custom Quote**

---

## 🎨 Pricing Display Improvements

### Visual Improvements
1. **Add pricing badges:**
   - "Most Popular" for mid-tier
   - "Best Value" for bundles
   - "Starting at" tags

2. **Price comparison table:**
   - Show residential vs. commercial side-by-side
   - Clear feature differences

3. **Value indicators:**
   - Show what's included
   - Highlight time/complexity estimates
   - Display typical project scope

---

## 📝 Copywriting Improvements

### Current (Line 206):
```html
• Smart Home Setup: $150-300
```

### Recommended Option A:
```html
• Smart Home Setup (Basic): Starting at $150
  ↳ 1-3 devices, single room
• Smart Home Setup (Complete): Starting at $500
  ↳ Full-home automation, 9+ devices
```

### Recommended Option B (Simpler):
```html
• Smart Home Setup: Starting at $150
  ↳ Pricing varies by number of devices and complexity
```

### Recommended Option C (Range with Context):
```html
• Smart Home Setup: Custom Quote
  ↳ Typical projects: $150-$1,500 depending on scope
```

---

## 🚀 Implementation Priority

### Phase 1: Immediate (This Week)
1. ✅ Fix smart home pricing cap issue
2. ✅ Add "Starting at" qualifier to flexible services
3. ✅ Add context/scope notes under each price

### Phase 2: Short-term (Next 2 Weeks)
1. Add commercial starting prices (not just "Custom Quote")
2. Create pricing tiers for managed support
3. Add security service pricing for business

### Phase 3: Long-term (Next Month)
1. Create dedicated `/pricing/` page
2. Add pricing calculator for smart home setups
3. Build price comparison table
4. Add testimonials with project costs

---

## 💡 Pricing Psychology Tips

### Best Practices to Implement:
1. **Anchoring:** Show highest price first to anchor expectations
2. **Charm Pricing:** Use $99 instead of $100, $149 instead of $150
3. **Value Stacking:** List everything included to justify price
4. **Social Proof:** Add "Most homeowners choose..." indicators
5. **Urgency:** "Book this month: First consultation free" (if applicable)

### Pricing Transparency:
- ✅ Show starting prices for all services
- ✅ Explain what affects final price (scope, devices, time)
- ✅ Provide realistic ranges, not just floors
- ✅ Make "Custom Quote" feel premium, not evasive

---

## 📊 Competitor Benchmark (West Texas Market)

### TV Mounting:
- Best Buy Geek Squad: $129.99-$229.99
- Local handymen: $75-$150
- **Nova Titan: $99** ✅ Competitive

### Smart Home Setup:
- Best Buy: $99-$299 per device
- Local integrators: $500-$2,000+ for full home
- **Nova Titan: $150-300** ⚠️ Underpriced for complete setups

### Remote Support:
- Geek Squad: $99-$199 per incident
- Local MSPs: $100-$150/hour
- **Nova Titan: $75/hour** ✅ Competitive

### WiFi Security Audit:
- Most competitors: Don't offer this as standalone
- Cybersecurity firms: $500-$1,500
- **Nova Titan: $149** ✅ Strong value proposition

---

## ✅ Final Recommendation

**IMMEDIATE ACTION (Priority 1):**
Change line 206 in `/services/index.html` from:
```html
<div>• Smart Home Setup: <span class="text-green-300 font-semibold">$150-300</span></div>
```

To one of these options:

**Option A (Best for clarity):**
```html
<div>• Smart Home Setup (Basic, 1-3 devices): <span class="text-green-300 font-semibold">Starting at $150</span></div>
<div>• Smart Home Setup (Complete, 9+ devices): <span class="text-green-300 font-semibold">Starting at $500</span></div>
```

**Option B (Simplest):**
```html
<div>• Smart Home Setup: <span class="text-green-300 font-semibold">Starting at $150</span></div>
<div class="text-xs text-gray-500 ml-6">Pricing varies by number of devices and home size</div>
```

**Option C (Most flexible):**
```html
<div>• Smart Home Setup: <span class="text-green-300 font-semibold">Starting at $150+</span></div>
<div class="text-xs text-gray-500 ml-6">Typical full-home projects: $500-$1,500</div>
```

---

## 📈 Expected Impact

### After Implementing Recommendations:
- ✅ **Higher average project value** (remove artificial ceiling)
- ✅ **More qualified leads** (customers understand scope better)
- ✅ **Less friction** (pricing transparency builds trust)
- ✅ **Easier sales conversations** (clear expectations set upfront)
- ✅ **Competitive positioning** (pricing aligned with market value)

---

**Next Steps:** Choose preferred pricing option and implement immediately.

---

*Generated February 13, 2026*
