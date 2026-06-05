"""
Second-pass redaction script.
Applies solid opaque black boxes over all flagged sensitive regions.
Coordinates are (left, top, right, bottom) in pixels — determined per-image.
"""
from PIL import Image, ImageDraw
import os, shutil

SRC = "/home/user/webapp/_batch2_review/extracted/assets/images/work"
OUT = "/home/user/webapp/_batch2_review/redacted"
os.makedirs(OUT, exist_ok=True)

# Each entry: (filename, [(left, top, right, bottom), ...])
# Coordinates determined by image dimensions and visible label positions
REDACTIONS = {

    # 1. NVR rack — blur "ESALSBW01-01" sticker on Ruckus switch bracket
    # Image is approx 1200x1600 tall portrait; label is mid-right area
    "nova-titan-commercial-nvr-poe-switch-rack-hikvision-lorex-west-texas-01": [
        (620, 1000, 980, 1070),   # ESALSBW01-01 asset tag on Ruckus bracket
    ],

    # 2. CCTV network rack — replace Gaussian blur on monitor with solid box
    # Also solid-box any equipment faceplates that were Gaussian-blurred
    "nova-titan-commercial-cctv-network-rack-white-cabling-west-texas-01": [
        (700, 150, 1100, 750),    # Monitor showing camera grid (right side)
        (0, 0, 350, 120),         # Top-left equipment faceplate label area
        (0, 120, 350, 300),       # Second faceplate area (also blurred)
    ],

    # 3. Full Dell rack — phone number "214-752-0317" on brown cardboard
    "nova-titan-full-dell-server-rack-after-install-west-texas-01": [
        (200, 1100, 900, 1280),   # Brown cardboard / envelope with phone number
    ],

    # 4. Fortinet firewall + Cisco router — "TX-LUB-44THSTREET-FORTI" + "172.20.51.1"
    "nova-titan-fortinet-firewall-cisco-router-commercial-rack-01": [
        (0, 0, 1200, 180),        # Top of rack — full sticker label row
        (0, 180, 800, 320),       # Any secondary label area on devices
    ],

    # 5a. Dual Fortinet/Cradlepoint angle 1 — "LUBWBB1" on Cradlepoint
    "nova-titan-dual-fortinet-firewalls-cradlepoint-wan-failover-01": [
        (200, 550, 900, 720),     # Cradlepoint LUBWBB1 yellow label
    ],

    # 5b. Cradlepoint angle 2 — same label, slightly different framing
    "nova-titan-cradlepoint-fortinet-wan-failover-rack-west-texas-01": [
        (200, 550, 900, 720),     # Cradlepoint LUBWBB1 yellow label
        (0, 0, 400, 120),         # Partially-visible top-left rack label
    ],

    # 6. Speedtest — IP 208.180.95.141 + "Optimum Online Lubbock TX" on screen
    "nova-titan-network-speedtest-verification-cisco-equipment-01": [
        (0, 0, 1300, 1000),       # Entire laptop screen area (already half blurred, cover all)
    ],

    # 7. Audio/network rack — "ROWNW-USA" label + orange sticky note on floor
    "nova-titan-audio-network-rack-fortinet-fortiswitch-crown-amp-01": [
        (0, 0, 600, 120),         # ROWNW-USA sticker on top unit
        (0, 1350, 600, 1600),     # Orange sticky note on floor (bottom-left)
    ],
}

def redact(name, boxes):
    src_path = os.path.join(SRC, f"{name}.jpg")
    if not os.path.exists(src_path):
        print(f"  MISSING: {src_path}")
        return

    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    print(f"\n{name}  ({w}x{h})")

    draw = ImageDraw.Draw(img)
    for box in boxes:
        # Clamp to image bounds
        l = max(0, box[0])
        t = max(0, box[1])
        r = min(w, box[2])
        b = min(h, box[3])
        draw.rectangle([l, t, r, b], fill=(20, 20, 20))
        print(f"  Redacted box: ({l},{t}) -> ({r},{b})")

    out_path = os.path.join(OUT, f"{name}.jpg")
    img.save(out_path, "JPEG", quality=88, optimize=True)
    print(f"  Saved: {out_path}")

for name, boxes in REDACTIONS.items():
    redact(name, boxes)

print("\n--- All redactions done ---")
