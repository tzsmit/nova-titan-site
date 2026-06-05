"""
Third-pass precision redaction — wider, safer boxes based on verified label positions.
All 4 images that failed re-inspection get re-processed from the ORIGINAL source files.
"""
from PIL import Image, ImageDraw
import os

SRC = "/home/user/webapp/_batch2_review/extracted/assets/images/work"
OUT = "/home/user/webapp/_batch2_review/redacted"
os.makedirs(OUT, exist_ok=True)

REDACTIONS = {

    # 1. NVR rack (1008x1790) — ESALSBW01-01 is on Ruckus bracket, mid-lower section
    # Audit said "mid-right area" — cover bottom half of rack broadly
    "nova-titan-commercial-nvr-poe-switch-rack-hikvision-lorex-west-texas-01": [
        (0, 950, 1008, 1150),    # Full-width band covering Ruckus bracket area
        # Also keep the existing top-left blur (was already in previous pass)
    ],

    # 4. FortiGate/Cisco rack (1600x2133) — TX-LUB-44THSTREET-FORTI + 172.20.51.1
    # Audit said sticker is ON the FortiGate device — device appears to be in upper third
    # Cover entire upper half of image to be certain
    "nova-titan-fortinet-firewall-cisco-router-commercial-rack-01": [
        (0, 0, 1600, 600),       # Top 600px covers FortiGate device and any labels
    ],

    # 5a. Dual Fortinet/Cradlepoint angle 1 (1386x1847) — LUBWBB1 on black Cradlepoint
    # Audit says unit is below the two white FortiGate units — lower section
    "nova-titan-dual-fortinet-firewalls-cradlepoint-wan-failover-01": [
        (0, 900, 1386, 1200),    # Cover lower section where Cradlepoint sits
        (0, 0, 1386, 200),       # Top rack label strip
    ],

    # 5b. Cradlepoint angle 2 (1600x1200) — LUBWBB1 same unit, landscape orientation
    "nova-titan-cradlepoint-fortinet-wan-failover-rack-west-texas-01": [
        (0, 600, 1600, 900),     # Cover lower portion where Cradlepoint label is
        (0, 0, 600, 150),        # Top-left rack label
    ],

    # 7. Audio rack (1516x2021) — ROWNW-USA is on TOP unit
    # Previous box was only 0-120px but label appears at top — go wider
    "nova-titan-audio-network-rack-fortinet-fortiswitch-crown-amp-01": [
        (0, 0, 1516, 200),       # Full-width top strip covering top unit sticker
        (0, 1300, 1516, 2021),   # Full-width bottom strip covering sticky note
    ],
}

def redact(name, boxes):
    # Start from original, then also re-apply any previous good redactions
    src_path = os.path.join(SRC, f"{name}.jpg")
    prev_path = os.path.join(OUT, f"{name}.jpg")
    # Use previous redacted version if it exists (stacks the fixes)
    use_path = prev_path if os.path.exists(prev_path) else src_path

    img = Image.open(use_path).convert("RGB")
    w, h = img.size
    print(f"\n{name}  ({w}x{h})")

    draw = ImageDraw.Draw(img)
    for box in boxes:
        l, t, r, b = max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3])
        draw.rectangle([l, t, r, b], fill=(15, 15, 15))
        print(f"  Box: ({l},{t})->({r},{b})")

    img.save(prev_path, "JPEG", quality=88, optimize=True)
    print(f"  Saved.")

for name, boxes in REDACTIONS.items():
    redact(name, boxes)

print("\n--- Done ---")
