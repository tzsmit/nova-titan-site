# Rejected Photos — Nova Titan Work Gallery
# Reviewed: 2026-05-23
# Reviewer: AI safety audit (visual inspection)

All rejected photos were excluded due to one or more of the following reasons:
- Internal asset labels / device naming visible (potential client data)
- Identifiable vendor branding in context that may imply unauthorized disclosure
- Detailed infrastructure layout that could expose private network topology
- Surveillance/NVR equipment visible in operational detail
- Close-up of active rack with dense cabling that reveals internal site structure

---

## Rejected Photos

### active-network-rack-troubleshooting.jpg / .webp
**Original:** 20260304_094021.jpg
**Reason:** Active server/network rack in close-up detail. Dell and Vertiv branding clearly visible. Dense cabling visible. A handwritten label is partially visible. The detailed layout of an active server room could be operationally sensitive for public sharing even without readable credentials.
**Recommendation:** Could be reconsidered if cropped tightly to a single non-identifiable component. Do not publish as-is.

---

### commercial-network-appliance-cabling-01.jpg / .webp
**Original:** 20260413_100124.jpg
**Reason:** Cradlepoint device clearly visible with internal asset label "LUBWBB1" — this appears to be an internal site identifier. Publishing this could disclose client asset naming conventions.
**Recommendation:** Reject entirely. The internal label is the disqualifying factor.

---

### commercial-network-appliance-cabling-02.jpg / .webp
**Original:** 20260413_100133.jpg
**Reason:** Same rack view as -01. Cradlepoint device visible. Internal site label "WBS02" (or similar) visible on rack face. Same disqualifying risk as -01.
**Recommendation:** Reject entirely.

---

### server-room-cabling-smart-hands.jpg / .webp
**Original:** 20260413_101739.jpg
**Reason:** Side-angle view of same Cradlepoint installation. Detailed infrastructure and cabling context. While no credentials are readable, the combination of identifiable device branding and internal labels in the same rack makes this unsuitable.
**Recommendation:** Reject. Part of the same installation session as -01 and -02.

---

### structured-cabling-patch-panel-work.jpg / .webp
**Original:** 20260417_102055.jpg
**Reason:** Detailed operational rack with Ericsson and Cradlepoint branding clearly visible. Multiple internal device labels and port markings present. The density of identifiable infrastructure details is not appropriate for a public-facing website photo.
**Recommendation:** Reject. Too much operational detail for public use.

---

### commercial-network-equipment-cabinet.jpg / .webp
**Original:** 20260417_102345.jpg
**Reason:** Large telecom/power cabinet with Raycap branding, 48V power distribution markings, RTN labels, and terminal block identifiers clearly visible. This is a specialized telecom power infrastructure detail. Publishing exposes client infrastructure type and vendor configuration context.
**Recommendation:** Reject entirely. Power infrastructure details should not be published.

---

### patch-panel-network-rack-closeup.jpg / .webp
**Original:** 20260427_191322.jpg
**Reason:** Multiple identifiable vendors visible: Hikvision (DVR/NVR), Lorex (NVR), Ruckus (wireless), AT&T (CPE box), Fortinet, Velocity. Numbered patch panel port layout visible. Surveillance NVR equipment present — this could imply access to a client's camera system. The combination of surveillance hardware and detailed patching is not appropriate for public use.
**Recommendation:** Reject. The Hikvision/Lorex NVR detail is the primary disqualifying factor.

---

### network-rack-equipment-closeout.jpg / .webp
**Original:** 20260427_191626.jpg
**Reason:** Wide complex telecom rack with extensive cabling, internal module layout, and rack labeling visible. Even without readable credentials, the level of infrastructure detail exposed is not appropriate for public marketing photos.
**Recommendation:** Reject. Consider a tighter crop that shows only general cabling without rack topology if reuse is desired.

---

## Summary
- Total photos in package: 16
- Approved for website: 8
- Rejected: 8
- Rejection rate: 50%

## Primary rejection reasons
1. Internal asset labels (client site identifiers) — 3 photos
2. Detailed active infrastructure layout — 3 photos
3. Surveillance/NVR equipment in operational context — 1 photo
4. Telecom power infrastructure detail — 1 photo

## Action items for owner
- Review rejected photos and determine if cropping can make any safe for use
- For any future photos, avoid capturing: device labels, screen content, NVR/DVR detail, identifiable rack labels
- Preferred photo types: wide shots, exterior work, cable pathway work, AP mounting, rack staging (pre-install)
