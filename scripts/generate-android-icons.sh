#!/usr/bin/env bash
# =============================================================================
#  Generate Android launcher icons from public/images/logo.png
# =============================================================================
#  Usage:
#     ./scripts/generate-android-icons.sh
#
#  Requires ImageMagick (`magick` or `convert`). Install:
#     macOS:   brew install imagemagick
#     Ubuntu:  sudo apt install imagemagick
#     Windows: https://imagemagick.org/script/download.php#windows
#
#  Run AFTER `npx cap add android` (so the android/ folder exists).
#  After running, rebuild the APK with ./scripts/build-apk.sh
# =============================================================================

set -euo pipefail

YELLOW='\033[1;33m'; GREEN='\033[0;32m'; RED='\033[0;31m'; NC='\033[0m'
log()  { echo -e "${YELLOW}▶ $*${NC}"; }
ok()   { echo -e "${GREEN}✓ $*${NC}"; }
fail() { echo -e "${RED}✗ $*${NC}"; exit 1; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_LOGO="$ROOT/public/images/logo.png"
ANDROID_RES="$ROOT/android/app/src/main/res"
BG_COLOR="#0d0d0d"   # dark brand background behind the logo

# Pick imagemagick command
if command -v magick >/dev/null 2>&1; then
  IM="magick"
elif command -v convert >/dev/null 2>&1; then
  IM="convert"
else
  fail "ImageMagick not found. Install it (brew install imagemagick) and retry."
fi

[ -f "$SRC_LOGO" ] || fail "Logo not found at $SRC_LOGO"
[ -d "$ANDROID_RES" ] || fail "Android folder missing — run 'npx cap add android' first."

log "Using $IM to generate icons from $SRC_LOGO …"

# Density buckets:  folder => square icon size in px
declare -a DENSITIES=(
  "mipmap-mdpi:48"
  "mipmap-hdpi:72"
  "mipmap-xhdpi:96"
  "mipmap-xxhdpi:144"
  "mipmap-xxxhdpi:192"
)

for entry in "${DENSITIES[@]}"; do
  folder="${entry%%:*}"
  size="${entry##*:}"
  out="$ANDROID_RES/$folder"
  mkdir -p "$out"

  # Logo size = 65% of canvas, padded inside square + brand bg
  inner=$(( size * 65 / 100 ))

  # Standard square launcher
  $IM -background "$BG_COLOR" -gravity center \
      \( "$SRC_LOGO" -resize "${inner}x${inner}" \) \
      -extent "${size}x${size}" \
      "$out/ic_launcher.png"

  # Round launcher (same image, Android masks it)
  cp "$out/ic_launcher.png" "$out/ic_launcher_round.png"

  # Foreground for adaptive icon (transparent bg, larger safe zone = 70%)
  fg_inner=$(( size * 70 / 100 ))
  $IM -background "none" -gravity center \
      \( "$SRC_LOGO" -resize "${fg_inner}x${fg_inner}" \) \
      -extent "${size}x${size}" \
      "$out/ic_launcher_foreground.png"

  ok "  $folder (${size}px)"
done

# Adaptive icon background color resource
mkdir -p "$ANDROID_RES/values"
cat > "$ANDROID_RES/values/ic_launcher_background.xml" <<EOF
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">$BG_COLOR</color>
</resources>
EOF
ok "Wrote ic_launcher_background.xml ($BG_COLOR)"

# Adaptive icon XML (Android 8.0+)
for variant in mipmap-anydpi-v26; do
  out="$ANDROID_RES/$variant"
  mkdir -p "$out"
  for name in ic_launcher ic_launcher_round; do
    cat > "$out/$name.xml" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
EOF
  done
done
ok "Wrote adaptive-icon XML for Android 8.0+"

echo ""
ok "Done! Now rebuild the APK:  ./scripts/build-apk.sh"
