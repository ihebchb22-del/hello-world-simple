$ErrorActionPreference = 'Stop'

function Log($message) {
  Write-Host "▶ $message" -ForegroundColor Yellow
}

function Ok($message) {
  Write-Host "✓ $message" -ForegroundColor Green
}

function Fail($message) {
  Write-Host "✗ $message" -ForegroundColor Red
  exit 1
}

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$LogoPath = Join-Path $Root 'public\images\logo.png'
$AndroidDir = Join-Path $Root 'android'
$AndroidRes = Join-Path $AndroidDir 'app\src\main\res'
$GradleFile = Join-Path $AndroidDir 'app\build.gradle'
$KeystoreProps = Join-Path $AndroidDir 'keystore.properties'
$ApkPath = Join-Path $AndroidDir 'app\build\outputs\apk\release\app-release.apk'
$BgColor = '#0d0d0d'

if (-not (Test-Path $LogoPath)) {
  Fail "Logo not found at public/images/logo.png"
}

Log 'Building web app (vite build)...'
npm run build
Ok 'Web build complete.'

if (-not (Test-Path $AndroidDir)) {
  Log 'Adding Capacitor Android platform...'
  npx cap add android
  Ok 'Android platform added.'
}

$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) {
  Fail 'ImageMagick is required for generating Android icons on Windows. Install it, then rerun this command.'
}

Log 'Generating Android launcher icons from your logo...'
$densities = @(
  @{ Folder = 'mipmap-mdpi'; Size = 48 },
  @{ Folder = 'mipmap-hdpi'; Size = 72 },
  @{ Folder = 'mipmap-xhdpi'; Size = 96 },
  @{ Folder = 'mipmap-xxhdpi'; Size = 144 },
  @{ Folder = 'mipmap-xxxhdpi'; Size = 192 }
)

$tmpDir = Join-Path $env:TEMP 'mf-android-icons'
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null

foreach ($density in $densities) {
  $folder = Join-Path $AndroidRes $density.Folder
  New-Item -ItemType Directory -Force -Path $folder | Out-Null

  $size = [int]$density.Size
  $inner = [int][math]::Floor($size * 0.65)
  $fgInner = [int][math]::Floor($size * 0.70)

  $resized = Join-Path $tmpDir ("logo-$size.png")
  $resizedFg = Join-Path $tmpDir ("logo-fg-$size.png")

  & $magick.Source $LogoPath -resize "${inner}x${inner}" $resized
  & $magick.Source $LogoPath -resize "${fgInner}x${fgInner}" $resizedFg

  $launcher = Join-Path $folder 'ic_launcher.png'
  $round = Join-Path $folder 'ic_launcher_round.png'
  $foreground = Join-Path $folder 'ic_launcher_foreground.png'

  & $magick.Source -size "${size}x${size}" "xc:$BgColor" $resized -gravity center -composite $launcher
  Copy-Item $launcher $round -Force
  & $magick.Source -size "${size}x${size}" 'xc:none' $resizedFg -gravity center -composite $foreground

  Ok ("  {0} ({1}px)" -f $density.Folder, $size)
}

$valuesDir = Join-Path $AndroidRes 'values'
New-Item -ItemType Directory -Force -Path $valuesDir | Out-Null
@"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">$BgColor</color>
</resources>
"@ | Set-Content -Path (Join-Path $valuesDir 'ic_launcher_background.xml') -Encoding UTF8

$anydpiDir = Join-Path $AndroidRes 'mipmap-anydpi-v26'
New-Item -ItemType Directory -Force -Path $anydpiDir | Out-Null
$adaptiveIconXml = @"
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
"@
$adaptiveIconXml | Set-Content -Path (Join-Path $anydpiDir 'ic_launcher.xml') -Encoding UTF8
$adaptiveIconXml | Set-Content -Path (Join-Path $anydpiDir 'ic_launcher_round.xml') -Encoding UTF8
Ok 'Android icons ready.'

Log 'Syncing Capacitor Android project...'
npx cap sync android
Ok 'Sync complete.'

if (-not (Test-Path $KeystoreProps)) {
  Fail 'Missing android\keystore.properties. Create it first, then rerun this command.'
}

if (-not (Test-Path $GradleFile)) {
  Fail 'android\app\build.gradle not found.'
}

$gradle = Get-Content -Path $GradleFile -Raw

if ($gradle -notmatch 'signingConfigs\s*\{') {
  $signingBlock = @"
android {
    signingConfigs {
        release {
            def kp = new Properties()
            def kpFile = rootProject.file("keystore.properties")
            if (kpFile.exists()) { kp.load(new FileInputStream(kpFile)) }
            storeFile file(kp["storeFile"] ?: "release.jks")
            storePassword kp["storePassword"] ?: ""
            keyAlias kp["keyAlias"] ?: ""
            keyPassword kp["keyPassword"] ?: ""
        }
    }
"@
  $gradle = [regex]::Replace($gradle, 'android\s*\{', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $signingBlock }, 1)
}

if ($gradle -notmatch 'signingConfig\s+signingConfigs\.release') {
  $gradle = [regex]::Replace($gradle, '(buildTypes\s*\{\s*release\s*\{)', '$1`r`n            signingConfig signingConfigs.release', 1)
}

Set-Content -Path $GradleFile -Value $gradle -Encoding UTF8
Ok 'Gradle signing config ready.'

Log 'Building signed release APK...'
Push-Location $AndroidDir
& .\gradlew.bat assembleRelease
Pop-Location

if (Test-Path $ApkPath) {
  Ok ("Done! APK ready: {0}" -f $ApkPath)
} else {
  Fail 'Build finished but app-release.apk was not found.'
}
