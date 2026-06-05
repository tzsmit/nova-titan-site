"""
Generate WebP versions for all redacted JPGs, then copy the full 25-image set
(17 originals + 8 re-processed) into assets/images/work/
"""
from PIL import Image
import os, shutil

REDACTED   = "/home/user/webapp/_batch2_review/redacted"
SRC_ORIG   = "/home/user/webapp/_batch2_review/extracted/assets/images/work"
DEST       = "/home/user/webapp/assets/images/work"
os.makedirs(DEST, exist_ok=True)

# Files that were redacted (use the redacted folder as source)
REDACTED_NAMES = [
    "nova-titan-commercial-nvr-poe-switch-rack-hikvision-lorex-west-texas-01",
    "nova-titan-commercial-cctv-network-rack-white-cabling-west-texas-01",
    "nova-titan-full-dell-server-rack-after-install-west-texas-01",
    "nova-titan-fortinet-firewall-cisco-router-commercial-rack-01",
    "nova-titan-dual-fortinet-firewalls-cradlepoint-wan-failover-01",
    "nova-titan-cradlepoint-fortinet-wan-failover-rack-west-texas-01",
    "nova-titan-network-speedtest-verification-cisco-equipment-01",
    "nova-titan-audio-network-rack-fortinet-fortiswitch-crown-amp-01",
]

copied = []
skipped = []

# Process all 25 JPGs from extracted folder
for f in os.listdir(SRC_ORIG):
    if not f.endswith(".jpg"):
        continue
    name = f.replace(".jpg", "")
    
    # Choose source: redacted version if it exists, otherwise original
    if name in REDACTED_NAMES:
        jpg_src = os.path.join(REDACTED, f)
    else:
        jpg_src = os.path.join(SRC_ORIG, f)

    jpg_dst  = os.path.join(DEST, f)
    webp_dst = os.path.join(DEST, f"{name}.webp")

    # Copy/overwrite the JPG
    shutil.copy2(jpg_src, jpg_dst)

    # Generate WebP from the (redacted) JPG
    img = Image.open(jpg_src).convert("RGB")
    img.save(webp_dst, "WEBP", quality=82, method=6)

    src_label = "REDACTED" if name in REDACTED_NAMES else "original"
    print(f"  [{src_label}] {name}")
    print(f"    JPG  -> {jpg_dst}  ({os.path.getsize(jpg_dst)//1024}KB)")
    print(f"    WebP -> {webp_dst}  ({os.path.getsize(webp_dst)//1024}KB)")
    copied.append(name)

print(f"\n=== Done: {len(copied)} images copied to {DEST} ===")
