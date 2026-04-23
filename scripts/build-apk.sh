#!/usr/bin/env bash
# =============================================================================
#  Muscle Factory — One-command Signed Release APK builder
# =============================================================================
#  Usage:
#     ./scripts/build-apk.sh
#
#  First run only:
#     1) Install Android Studio + JDK 17 (https://developer.android.com/studio)
#     2) Generate a keystore ONCE (keep the .jks file safe & backed up!):
#
#        keytool -genkey -v -keystore muscle-factory.jks \
#          -keyalg RSA -keysize 2048 -validity 10000 \
#          -alias musclefactory
#
#     3) Create a file called  android/keystore.properties  with:
#
#        storeFile=../../muscle-factory.jks
#        storePassword=YOUR_STORE_PASSWORD
#        keyAlias=musclefactory
#        keyPassword=YOUR_KEY_PASSWORD
#
#     4) Run this script. The signed APK will appear at:
#        android/app/build/outputs/apk/release/app-release.apk
# =============================================================================

set -euo pipefail

YELLOW='\033[1;33m'; GREEN='\033[0;32m'; RED='\033[0;31m'; NC='\033[0m'
log()  { echo -e "${YELLOW}▶ $*${NC}"; }
ok()   { echo -e "${GREEN}✓ $*${NC}"; }
fail() { echo -e "${RED}✗ $*${NC}"; exit 1; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# 1. Build the web app -------------------------------------------------------
log "Building web app (vite build)…"
npm run build
ok "Web build complete."

# 2. Add android platform if missing -----------------------------------------
if [ ! -d "android" ]; then
  log "Adding Capacitor Android platform…"
  npx cap add android
fi

# 3. Sync web assets into the android project --------------------------------
log "Syncing assets to Android…"
npx cap sync android
ok "Sync complete."

# 4. Wire up release signing config (idempotent) -----------------------------
GRADLE_FILE="android/app/build.gradle"
KEYSTORE_PROPS="android/keystore.properties"

if [ ! -f "$KEYSTORE_PROPS" ]; then
  fail "Missing $KEYSTORE_PROPS — see header of this script for setup."
fi

if ! grep -q "signingConfigs.release" "$GRADLE_FILE"; then
  log "Patching $GRADLE_FILE with release signing config…"
  # Insert signingConfigs + buildTypes.release just inside the android { } block
  awk '
    /^android \{/ && !done {
      print
      print "    signingConfigs {"
      print "        release {"
      print "            def kp = new Properties()"
      print "            def kpFile = rootProject.file(\"keystore.properties\")"
      print "            if (kpFile.exists()) { kp.load(new FileInputStream(kpFile)) }"
      print "            storeFile file(kp[\"storeFile\"] ?: \"release.jks\")"
      print "            storePassword kp[\"storePassword\"] ?: \"\""
      print "            keyAlias kp[\"keyAlias\"] ?: \"\""
      print "            keyPassword kp[\"keyPassword\"] ?: \"\""
      print "        }"
      print "    }"
      print "    buildTypes {"
      print "        release {"
      print "            signingConfig signingConfigs.release"
      print "            minifyEnabled false"
      print "        }"
      print "    }"
      done=1
      next
    }
    { print }
  ' "$GRADLE_FILE" > "$GRADLE_FILE.tmp" && mv "$GRADLE_FILE.tmp" "$GRADLE_FILE"
  ok "Gradle patched."
fi

# 5. Assemble the signed release APK -----------------------------------------
log "Building signed release APK (gradle assembleRelease)…"
cd android
chmod +x ./gradlew
./gradlew assembleRelease
cd "$ROOT"

APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
  SIZE=$(du -h "$APK_PATH" | cut -f1)
  ok "Done!  APK ready: $APK_PATH  ($SIZE)"
  echo ""
  echo "📱 Transfer this file to your Android phone and tap to install."
else
  fail "Build finished but APK not found at expected path."
fi
