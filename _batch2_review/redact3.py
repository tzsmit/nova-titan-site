"""
Final precision pass — always re-read from ORIGINAL and apply ALL boxes at once.
Using verified position intel from the AI visual audit:
- NVR: ESALSBW01-01 is on LEFT side of Ruckus switch bezel (lower-center of image)
- FortiGate/Cisco: sticker is ON the white FortiGate unit body (middle of image)
- Cradlepoint x2: LUBWBB1 yellow sticker on TOP of black Cradlepoint unit
- Audio rack: ROWNW-USA on top of black fanless PC unit; paper on server below
"""
from PIL import Image, ImageDraw
import os

SRC = "/home/user/webapp/_batch2_review/extracted/assets/images/work"
OUT = "/home/user/webapp/_batch2_review/redacted"
os.makedirs(OUT, exist_ok=True)

REDACTIONS = {

    # NVR rack (1008x1790)
    # ESALSBW01-01 on LEFT side of Ruckus bezel, Ruckus is ~60-65% down the image
    # CyberPower / TRENDnet below that
    # Cover the Ruckus row AND the full lower quarter to catch anything below
    "nova-titan-commercial-nvr-poe-switch-rack-hikvision-lorex-west-texas-01": [
        (0,    0,  500,  200),   # Existing top-left faceplate mask (keep)
        (0,  850, 1008, 1100),   # Ruckus switch row — ESALSBW01-01 lives here
        (0, 1100, 1008, 1400),   # Lower bracket/cable area below Ruckus
    ],

    # FortiGate/Cisco rack (1600x2133)
    # Sticker on FortiGate body — FortiGate appears at ~30-55% height
    # Cover middle band + keep top-of-rack strip
    "nova-titan-fortinet-firewall-cisco-router-commercial-rack-01": [
        (0,    0, 1600,  200),   # Top of rack label strip
        (0,  400, 1600,  900),   # FortiGate device body where sticker sits
        (0,  900, 1200, 1100),   # Cisco 2800 row below
    ],

    # Dual Fortinet/Cradlepoint angle 1 (1386x1847)
    # Cradlepoint is the black unit BELOW the two white FortiGate units
    # Yellow LUBWBB1 sticker on TOP of Cradlepoint body
    # FortiGates appear to take up top ~50%, Cradlepoint in 50-75% range
    "nova-titan-dual-fortinet-firewalls-cradlepoint-wan-failover-01": [
        (0,    0, 1386,  200),   # Top rack label strip
        (0,  800, 1386, 1100),   # Cradlepoint unit area
        (0, 1100, 1386, 1300),   # Below Cradlepoint for any overflow
    ],

    # Cradlepoint angle 2 (1600x1200) — landscape
    # Cradlepoint is lower portion, LUBWBB1 label on top surface
    "nova-titan-cradlepoint-fortinet-wan-failover-rack-west-texas-01": [
        (0,    0,  700,  150),   # Top-left rack label
        (0,  550, 1600,  850),   # Cradlepoint unit — covers full width at mid-lower
        (0,  850, 1600, 1050),   # Below Cradlepoint
    ],

    # Audio/AV rack (1516x2021)
    # ROWNW-USA label on fanless PC at top; paper with "Confirmation Scripts" on server below
    # PC unit appears to be in upper portion ~0-25%
    # Server/paper appears in lower area
    "nova-titan-audio-network-rack-fortinet-fortiswitch-crown-amp-01": [
        (0,    0, 1516,  350),   # Full-width top — covers fanless PC and ROWNW-USA
        (0,  350,  900,  600),   # Left side of mid-section for any label overflow
        (0, 1100, 1516, 1500),   # Lower server area with paper/sticky note
        (0, 1500, 1516, 2021),   # Bottom strip
    ],
}

def redact(name, boxes):
    # Always start from ORIGINAL source to avoid stale cache issues
    src_path = os.path.join(SRC, f"{name}.jpg")
    out_path = os.path.join(OUT, f"{name}.jpg")

    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    print(f"\n{name}  ({w}x{h})")

    draw = ImageDraw.Draw(img)
    for box in boxes:
        l, t, r, b = max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3])
        draw.rectangle([l, t, r, b], fill=(12, 12, 12))
        print(f"  Box: ({l},{t})->({r},{b})  size:{r-l}x{b-t}")

    img.save(out_path, "JPEG", quality=88, optimize=True)
    print(f"  -> {out_path}")

for name, boxes in REDACTIONS.items():
    redact(name, boxes)

print("\n=== All done ===")
