$ErrorActionPreference = 'Stop'

function Log-Step($message) { Write-Host ('> ' + $message) -ForegroundColor Yellow }
function Log-Ok($message)   { Write-Host ('OK ' + $message) -ForegroundColor Green }
function Log-Fail($message) { Write-Host ('FAIL ' + $message) -ForegroundColor Red; exit 1 }

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$LogoPath         = Join-Path $Root 'public\images\logo.png'
$AndroidDir       = Join-Path $Root 'android'
$AndroidRes       = Join-Path $AndroidDir 'app\src\main\res'
$GradleGroovyFile = Join-Path $AndroidDir 'app\build.gradle'
$GradleKtsFile    = Join-Path $AndroidDir 'app\build.gradle.kts'
$KeystoreProps    = Join-Path $AndroidDir 'keystore.properties'
$KeyStoreFile     = Join-Path $AndroidDir 'release-keystore.jks'
$ApkPath          = Join-Path $AndroidDir 'app\build\outputs\apk\release\app-release.apk'
$AabPath          = Join-Path $AndroidDir 'app\build\outputs\bundle\release\app-release.aab'
$DistDir          = Join-Path $Root 'dist-android'
$BgColor          = '#0d0d0d'
$KeyAlias         = 'musclefactory'
$KeyPassword      = 'androidrelease'
$StorePassword    = 'androidrelease'

function Ensure-AndroidPlatform {
  if (-not (Test-Path $AndroidDir)) {
    Log-Step 'Adding Capacitor Android platform...'
    npx cap add android
    Log-Ok 'Android platform added.'
  }
}

function Ensure-SystemDrawing {
  try {
    Add-Type -AssemblyName System.Drawing
  } catch {
    Log-Fail 'System.Drawing is not available in this PowerShell runtime.'
  }
}

function New-SquarePng($sourcePath, $destinationPath, $canvasSize, $maxLogoSize, $backgroundHex, $transparentBackground) {
  $background = [System.Drawing.ColorTranslator]::FromHtml($backgroundHex)
  $bitmap = New-Object System.Drawing.Bitmap($canvasSize, $canvasSize)
  try {
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

      if ($transparentBackground) {
        $graphics.Clear([System.Drawing.Color]::Transparent)
      } else {
        $graphics.Clear($background)
      }

      $source = [System.Drawing.Image]::FromFile($sourcePath)
      try {
        $ratio = [Math]::Min($maxLogoSize / $source.Width, $maxLogoSize / $source.Height)
        $drawWidth = [int][Math]::Round($source.Width * $ratio)
        $drawHeight = [int][Math]::Round($source.Height * $ratio)
        $x = [int][Math]::Floor(($canvasSize - $drawWidth) / 2)
        $y = [int][Math]::Floor(($canvasSize - $drawHeight) / 2)
        $graphics.DrawImage($source, $x, $y, $drawWidth, $drawHeight)
      } finally {
        $source.Dispose()
      }

      $bitmap.Save($destinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $graphics.Dispose()
    }
  } finally {
    $bitmap.Dispose()
  }
}

function Generate-AndroidIcons {
  if (-not (Test-Path $LogoPath)) { Log-Fail 'Logo not found at public/images/logo.png' }
  Ensure-SystemDrawing

  Log-Step 'Generating Android launcher icons from your logo...'
  $densities = @(
    @{ Folder = 'mipmap-mdpi';    Size = 48  },
    @{ Folder = 'mipmap-hdpi';    Size = 72  },
    @{ Folder = 'mipmap-xhdpi';   Size = 96  },
    @{ Folder = 'mipmap-xxhdpi';  Size = 144 },
    @{ Folder = 'mipmap-xxxhdpi'; Size = 192 }
  )

  foreach ($density in $densities) {
    $folder = Join-Path $AndroidRes $density.Folder
    New-Item -ItemType Directory -Force -Path $folder | Out-Null

    $size = [int]$density.Size
    $logoSize = [int][Math]::Floor($size * 0.65)
    $fgLogoSize = [int][Math]::Floor($size * 0.70)

    $launcher = Join-Path $folder 'ic_launcher.png'
    $round = Join-Path $folder 'ic_launcher_round.png'
    $foreground = Join-Path $folder 'ic_launcher_foreground.png'

    New-SquarePng $LogoPath $launcher $size $logoSize $BgColor $false
    Copy-Item $launcher $round -Force
    New-SquarePng $LogoPath $foreground $size $fgLogoSize $BgColor $true

    Log-Ok ('  ' + $density.Folder + ' (' + $size + 'px)')
  }

  $valuesDir = Join-Path $AndroidRes 'values'
  New-Item -ItemType Directory -Force -Path $valuesDir | Out-Null
  $bgXml = '<?xml version="1.0" encoding="utf-8"?>' + "`r`n" +
           '<resources>' + "`r`n" +
           '    <color name="ic_launcher_background">' + $BgColor + '</color>' + "`r`n" +
           '</resources>' + "`r`n"
  Set-Content -Path (Join-Path $valuesDir 'ic_launcher_background.xml') -Value $bgXml -Encoding UTF8

  $anydpiDir = Join-Path $AndroidRes 'mipmap-anydpi-v26'
  New-Item -ItemType Directory -Force -Path $anydpiDir | Out-Null
  $adaptiveIconXml = '<?xml version="1.0" encoding="utf-8"?>' + "`r`n" +
                     '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">' + "`r`n" +
                     '    <background android:drawable="@color/ic_launcher_background"/>' + "`r`n" +
                     '    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>' + "`r`n" +
                     '</adaptive-icon>' + "`r`n"
  Set-Content -Path (Join-Path $anydpiDir 'ic_launcher.xml') -Value $adaptiveIconXml -Encoding UTF8
  Set-Content -Path (Join-Path $anydpiDir 'ic_launcher_round.xml') -Value $adaptiveIconXml -Encoding UTF8
  Log-Ok 'Android icons ready.'
}

function Find-Jdk21Home {
  # 1. Standard install paths for JDK 21 (Microsoft, Eclipse Temurin, Amazon Corretto, Zulu)
  $candidateRoots = @(
    'C:\Program Files\Microsoft\jdk-21*',
    'C:\Program Files\Eclipse Adoptium\jdk-21*',
    'C:\Program Files\Java\jdk-21*',
    'C:\Program Files\Amazon Corretto\jdk21*',
    'C:\Program Files\Zulu\zulu-21*'
  )
  foreach ($root in $candidateRoots) {
    $found = Get-ChildItem -Path $root -Directory -ErrorAction SilentlyContinue |
             Where-Object { Test-Path (Join-Path $_.FullName 'bin\keytool.exe') } |
             Sort-Object Name -Descending | Select-Object -First 1
    if ($found) { return $found.FullName }
  }
  # 2. Fall back to JAVA_HOME only if it actually points at a JDK 21
  if ($env:JAVA_HOME -and (Test-Path (Join-Path $env:JAVA_HOME 'bin\keytool.exe'))) {
    $releaseFile = Join-Path $env:JAVA_HOME 'release'
    if (Test-Path $releaseFile) {
      $line = Select-String -Path $releaseFile -Pattern '^JAVA_VERSION=' -ErrorAction SilentlyContinue | Select-Object -First 1
      if ($line -and $line.Line -match 'JAVA_VERSION="?21') { return $env:JAVA_HOME }
    }
  }
  return $null
}

function Find-Keytool {
  $jdk21 = Find-Jdk21Home
  if ($jdk21) { return (Join-Path $jdk21 'bin\keytool.exe') }
  return $null
}

function Ensure-Jdk {
  $jdk21Home = Find-Jdk21Home
  if (-not $jdk21Home) {
    Log-Step 'JDK 21 not found. Installing Microsoft.OpenJDK.21 via winget (Gradle is not compatible with JDK 25)...'
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if (-not $winget) {
      Log-Fail 'winget is not available. Install JDK 21 manually from https://learn.microsoft.com/java/openjdk/download then re-run this script.'
    }

    & winget install --id Microsoft.OpenJDK.21 -e --accept-source-agreements --accept-package-agreements --silent
    if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne -1978335189) {
      Log-Fail 'winget install failed. Install JDK 21 manually from https://learn.microsoft.com/java/openjdk/download then re-run this script.'
    }

    $jdk21Home = Find-Jdk21Home
    if (-not $jdk21Home) {
      Log-Fail 'JDK 21 installed but could not be located. Close this window, open a new PowerShell, then re-run .\scripts\build-android.cmd'
    }
  }

  # Pin JAVA_HOME and PATH to JDK 21 for this process (overriding any newer JDK like 25)
  $env:JAVA_HOME = $jdk21Home
  $jdk21Bin = Join-Path $jdk21Home 'bin'
  $env:Path = $jdk21Bin + ';' + $env:Path

  $keytoolPath = Join-Path $jdk21Bin 'keytool.exe'
  if (-not (Test-Path $keytoolPath)) {
    Log-Fail ('keytool.exe not found in ' + $jdk21Bin)
  }
  Log-Ok ('Using JDK 21 at ' + $env:JAVA_HOME)
  return $keytoolPath
}

function Clear-GradleNativeCache {
  # JDK upgrades can leave a broken gradle-fileevents.dll cached under ~/.gradle/native.
  # Wipe it so Gradle re-extracts a working copy for the current JVM.
  $nativeDir = Join-Path $env:USERPROFILE '.gradle\native'
  if (Test-Path $nativeDir) {
    Log-Step 'Clearing stale Gradle native cache (~/.gradle/native)...'
    Remove-Item -Recurse -Force $nativeDir -ErrorAction SilentlyContinue
    Log-Ok 'Gradle native cache cleared.'
  }
}

function Ensure-Keystore {
  if (-not (Test-Path $KeyStoreFile)) {
    $keytoolPath = Ensure-Jdk

    Log-Step 'Creating release keystore automatically...'
    & $keytoolPath -genkeypair -v -storetype PKCS12 -keystore $KeyStoreFile -storepass $StorePassword -keypass $KeyPassword -alias $KeyAlias -dname 'CN=Muscle Factory, OU=Mobile, O=Muscle Factory, L=Tunis, S=Tunis, C=TN' -keyalg RSA -keysize 2048 -validity 10000
    Log-Ok 'Release keystore created at android\release-keystore.jks'
  }

  if (-not (Test-Path $KeystoreProps)) {
    $props = 'storeFile=release-keystore.jks' + "`r`n" +
             'storePassword=' + $StorePassword + "`r`n" +
             'keyAlias=' + $KeyAlias + "`r`n" +
             'keyPassword=' + $KeyPassword + "`r`n"
    Set-Content -Path $KeystoreProps -Value $props -Encoding UTF8
    Log-Ok 'android\keystore.properties created automatically.'
  }
}

function Get-GradleFile {
  if (Test-Path $GradleGroovyFile) { return @{ Path = $GradleGroovyFile; Kind = 'groovy' } }
  if (Test-Path $GradleKtsFile) { return @{ Path = $GradleKtsFile; Kind = 'kts' } }
  Log-Fail 'Could not find android app Gradle file.'
}

function Patch-GroovyGradle($path) {
  $gradle = Get-Content -Path $path -Raw

  if ($gradle -notmatch 'signingConfigs\s*\{[\s\S]*?release\s*\{') {
    $signingBlock = 'android {' + "`r`n" +
                    '    signingConfigs {' + "`r`n" +
                    '        release {' + "`r`n" +
                    '            def kp = new Properties()' + "`r`n" +
                    '            def kpFile = rootProject.file("keystore.properties")' + "`r`n" +
                    '            if (kpFile.exists()) { kp.load(new FileInputStream(kpFile)) }' + "`r`n" +
                    '            storeFile rootProject.file(kp["storeFile"] ?: "release-keystore.jks")' + "`r`n" +
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
      '(buildTypes\s*\{[\s\S]*?release\s*\{)',
      { param($m) $m.Value + "`r`n" + '            signingConfig signingConfigs.release' },
      1
    )
  }

  Set-Content -Path $path -Value $gradle -Encoding UTF8
}

function Patch-KtsGradle($path) {
  $gradle = Get-Content -Path $path -Raw

  if ($gradle -notmatch 'signingConfigs\s*\{[\s\S]*?create\("release"\)') {
    $signingBlock = 'android {' + "`r`n" +
                    '    signingConfigs {' + "`r`n" +
                    '        create("release") {' + "`r`n" +
                    '            val kp = java.util.Properties()' + "`r`n" +
                    '            val kpFile = rootProject.file("keystore.properties")' + "`r`n" +
                    '            if (kpFile.exists()) { kp.load(java.io.FileInputStream(kpFile)) }' + "`r`n" +
                    '            storeFile = rootProject.file((kp["storeFile"] as String?) ?: "release-keystore.jks")' + "`r`n" +
                    '            storePassword = (kp["storePassword"] as String?) ?: ""' + "`r`n" +
                    '            keyAlias = (kp["keyAlias"] as String?) ?: ""' + "`r`n" +
                    '            keyPassword = (kp["keyPassword"] as String?) ?: ""' + "`r`n" +
                    '        }' + "`r`n" +
                    '    }'
    $gradle = [regex]::Replace($gradle, 'android\s*\{', { param($m) $signingBlock }, 1)
  }

  if ($gradle -notmatch 'signingConfig\s*=\s*signingConfigs\.getByName\("release"\)') {
    $gradle = [regex]::Replace(
      $gradle,
      '(getByName\("release"\)\s*\{)',
      { param($m) $m.Value + "`r`n" + '            signingConfig = signingConfigs.getByName("release")' },
      1
    )
  }

  Set-Content -Path $path -Value $gradle -Encoding UTF8
}

if (-not (Test-Path $LogoPath)) { Log-Fail 'Logo not found at public/images/logo.png' }

Log-Step 'Building web app (vite build)...'
npm run build
Log-Ok 'Web build complete.'

Ensure-AndroidPlatform
Generate-AndroidIcons

Log-Step 'Syncing Capacitor Android project...'
npx cap sync android
Log-Ok 'Sync complete.'

Ensure-Jdk | Out-Null

Ensure-Keystore

$gradleInfo = Get-GradleFile
if ($gradleInfo.Kind -eq 'groovy') {
  Patch-GroovyGradle $gradleInfo.Path
} else {
  Patch-KtsGradle $gradleInfo.Path
}
Log-Ok 'Gradle signing config ready.'

Clear-GradleNativeCache

Log-Step 'Building signed release APK + AAB (gradlew assembleRelease bundleRelease)...'
$javaHomeForGradle = $env:JAVA_HOME
Push-Location $AndroidDir
try {
  & .\gradlew.bat "-Dorg.gradle.java.home=$javaHomeForGradle" --no-daemon assembleRelease bundleRelease
  $gradleExit = $LASTEXITCODE
} finally {
  Pop-Location
}
if ($gradleExit -ne 0) { Log-Fail ('Gradle build failed with exit code ' + $gradleExit) }

New-Item -ItemType Directory -Force -Path $DistDir | Out-Null
$producedApk = Test-Path $ApkPath
$producedAab = Test-Path $AabPath

if ($producedApk) {
  Copy-Item $ApkPath (Join-Path $DistDir 'muscle-factory-release.apk') -Force
  Log-Ok ('APK ready: ' + (Join-Path $DistDir 'muscle-factory-release.apk'))
}
if ($producedAab) {
  Copy-Item $AabPath (Join-Path $DistDir 'muscle-factory-release.aab') -Force
  Log-Ok ('AAB ready: ' + (Join-Path $DistDir 'muscle-factory-release.aab'))
}

if (-not $producedApk -and -not $producedAab) {
  Log-Fail 'Build finished but neither APK nor AAB was found.'
}

Write-Host ''
Write-Host 'APK  -> install directly on a phone (sideload).' -ForegroundColor Cyan
Write-Host 'AAB  -> upload to Google Play Console.' -ForegroundColor Cyan
Write-Host 'Important: Back up android\release-keystore.jks for future app updates.' -ForegroundColor Yellow
