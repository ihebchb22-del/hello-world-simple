$ErrorActionPreference = 'Stop'

function Log-Step($message) { Write-Host ('> ' + $message) -ForegroundColor Yellow }
function Log-Ok($message)   { Write-Host ('OK ' + $message) -ForegroundColor Green }
function Log-Fail($message) { Write-Host ('FAIL ' + $message) -ForegroundColor Red; exit 1 }

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$LogoPath      = Join-Path $Root 'public\images\logo.png'
$AndroidDir    = Join-Path $Root 'android'
$AndroidRes    = Join-Path $AndroidDir 'app\src\main\res'
$GradleFile    = Join-Path $AndroidDir 'app\build.gradle'
$KeystoreProps = Join-Path $AndroidDir 'keystore.properties'
$ApkPath       = Join-Path $AndroidDir 'app\build\outputs\apk\release\app-release.apk'
$BgColor       = '#0d0d0d'

if (-not (Test-Path $LogoPath)) { Log-Fail 'Logo not found at public/images/logo.png' }

Log-Step 'Building web app (vite build)...'
npm run build
Log-Ok 'Web build complete.'

if (-not (Test-Path $AndroidDir)) {
  Log-Step 'Adding Capacitor Android platform...'
  npx cap add android
  Log-Ok 'Android platform added.'
}

$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) { Log-Fail 'ImageMagick is required. Install it (https://imagemagick.org) and rerun.' }

Log-Step 'Generating Android launcher icons from your logo...'
$densities = @(
  @{ Folder = 'mipmap-mdpi';    Size = 48  },
  @{ Folder = 'mipmap-hdpi';    Size = 72  },
  @{ Folder = 'mipmap-xhdpi';   Size = 96  },
  @{ Folder = 'mipmap-xxhdpi';  Size = 144 },
  @{ Folder = 'mipmap-xxxhdpi'; Size = 192 }
)

$tmpDir = Join-Path $env:TEMP 'mf-android-icons'
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null

foreach ($density in $densities) {
  $folder = Join-Path $AndroidRes $density.Folder
  New-Item -ItemType Directory -Force -Path $folder | Out-Null

  $size    = [int]$density.Size
  $inner   = [int][math]::Floor($size * 0.65)
  $fgInner = [int][math]::Floor($size * 0.70)

  $sizeBox    = [string]$size + 'x' + [string]$size
  $innerBox   = [string]$inner + 'x' + [string]$inner
  $fgInnerBox = [string]$fgInner + 'x' + [string]$fgInner

  $resized   = Join-Path $tmpDir ('logo-' + $size + '.png')
  $resizedFg = Join-Path $tmpDir ('logo-fg-' + $size + '.png')

  & $magick.Source $LogoPath -resize $innerBox $resized
  & $magick.Source $LogoPath -resize $fgInnerBox $resizedFg

  $launcher   = Join-Path $folder 'ic_launcher.png'
  $round      = Join-Path $folder 'ic_launcher_round.png'
  $foreground = Join-Path $folder 'ic_launcher_foreground.png'

  & $magick.Source -size $sizeBox ('xc:' + $BgColor) $resized   -gravity center -composite $launcher
  Copy-Item $launcher $round -Force
  & $magick.Source -size $sizeBox 'xc:none'          $resizedFg -gravity center -composite $foreground

  Log-Ok ('  ' + $density.Folder + ' (' + $size + 'px)')
}

# values/ic_launcher_background.xml
$valuesDir = Join-Path $AndroidRes 'values'
New-Item -ItemType Directory -Force -Path $valuesDir | Out-Null
$bgXml = '<?xml version="1.0" encoding="utf-8"?>' + "`r`n" +
         '<resources>' + "`r`n" +
         '    <color name="ic_launcher_background">' + $BgColor + '</color>' + "`r`n" +
         '</resources>' + "`r`n"
Set-Content -Path (Join-Path $valuesDir 'ic_launcher_background.xml') -Value $bgXml -Encoding UTF8

# mipmap-anydpi-v26 adaptive icons
$anydpiDir = Join-Path $AndroidRes 'mipmap-anydpi-v26'
New-Item -ItemType Directory -Force -Path $anydpiDir | Out-Null
$adaptiveIconXml = '<?xml version="1.0" encoding="utf-8"?>' + "`r`n" +
                   '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">' + "`r`n" +
                   '    <background android:drawable="@color/ic_launcher_background"/>' + "`r`n" +
                   '    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>' + "`r`n" +
                   '</adaptive-icon>' + "`r`n"
Set-Content -Path (Join-Path $anydpiDir 'ic_launcher.xml')       -Value $adaptiveIconXml -Encoding UTF8
Set-Content -Path (Join-Path $anydpiDir 'ic_launcher_round.xml') -Value $adaptiveIconXml -Encoding UTF8
Log-Ok 'Android icons ready.'

Log-Step 'Syncing Capacitor Android project...'
npx cap sync android
Log-Ok 'Sync complete.'

if (-not (Test-Path $KeystoreProps)) { Log-Fail 'Missing android\keystore.properties. Create it then rerun.' }
if (-not (Test-Path $GradleFile))    { Log-Fail 'android\app\build.gradle not found.' }

# Patch build.gradle (idempotent) using single-quoted strings so $ chars stay literal
$gradle = Get-Content -Path $GradleFile -Raw

if ($gradle -notmatch 'signingConfigs\s*\{') {
  $signingBlock = 'android {' + "`r`n" +
                  '    signingConfigs {' + "`r`n" +
                  '        release {' + "`r`n" +
                  '            def kp = new Properties()' + "`r`n" +
                  '            def kpFile = rootProject.file("keystore.properties")' + "`r`n" +
                  '            if (kpFile.exists()) { kp.load(new FileInputStream(kpFile)) }' + "`r`n" +
                  '            storeFile file(kp["storeFile"] ?: "release.jks")' + "`r`n" +
                  '            storePassword kp["storePassword"] ?: ""' + "`r`n" +
                  '            keyAlias kp["keyAlias"] ?: ""' + "`r`n" +
                  '            keyPassword kp["keyPassword"] ?: ""' + "`r`n" +
                  '        }' + "`r`n" +
                  '    }'
  $gradle = [regex]::Replace($gradle, 'android\s*\{', { param($m) $signingBlock }, 1)
}

if ($gradle -notmatch 'signingConfig\s+signingConfigs\.release') {
  $gradle = [regex]::Replace(
    $gradle,
    '(buildTypes\s*\{\s*release\s*\{)',
    { param($m) $m.Value + "`r`n" + '            signingConfig signingConfigs.release' },
    1
  )
}

Set-Content -Path $GradleFile -Value $gradle -Encoding UTF8
Log-Ok 'Gradle signing config ready.'

Log-Step 'Building signed release APK (gradlew assembleRelease)...'
Push-Location $AndroidDir
& .\gradlew.bat assembleRelease
Pop-Location

if (Test-Path $ApkPath) {
  Log-Ok ('Done! APK ready: ' + $ApkPath)
  Write-Host ''
  Write-Host 'Transfer this file to your Android phone and tap to install.' -ForegroundColor Cyan
} else {
  Log-Fail 'Build finished but app-release.apk was not found.'
}
