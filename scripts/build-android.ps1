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

function Find-Keytool {
  $keytoolCmd = Get-Command keytool -ErrorAction SilentlyContinue
  if ($keytoolCmd) { return $keytoolCmd.Source }
  if ($env:JAVA_HOME) {
    $candidate = Join-Path $env:JAVA_HOME 'bin\keytool.exe'
    if (Test-Path $candidate) { return $candidate }
  }
  return $null
}

function Ensure-Jdk {
  $keytoolPath = Find-Keytool
  if ($keytoolPath) { return $keytoolPath }

  Log-Step 'JDK not found. Attempting automatic install via winget (Microsoft.OpenJDK.21)...'
  $winget = Get-Command winget -ErrorAction SilentlyContinue
  if (-not $winget) {
    Log-Fail 'winget is not available. Install JDK 21 manually from https://learn.microsoft.com/java/openjdk/download then re-run this script.'
  }

  & winget install --id Microsoft.OpenJDK.21 -e --accept-source-agreements --accept-package-agreements --silent
  if ($LASTEXITCODE -ne 0) {
    Log-Fail 'winget install failed. Install JDK 21 manually from https://learn.microsoft.com/java/openjdk/download then re-run this script.'
  }

  # Refresh PATH and JAVA_HOME from the registry without restarting PowerShell
  $machinePath = [System.Environment]::GetEnvironmentVariable('Path', 'Machine')
  $userPath    = [System.Environment]::GetEnvironmentVariable('Path', 'User')
  $env:Path    = $machinePath + ';' + $userPath
  $machineJavaHome = [System.Environment]::GetEnvironmentVariable('JAVA_HOME', 'Machine')
  $userJavaHome    = [System.Environment]::GetEnvironmentVariable('JAVA_HOME', 'User')
  if ($machineJavaHome) { $env:JAVA_HOME = $machineJavaHome }
  elseif ($userJavaHome) { $env:JAVA_HOME = $userJavaHome }

  if (-not $env:JAVA_HOME) {
    $jdkRoot = 'C:\Program Files\Microsoft\jdk-21*'
    $found = Get-ChildItem -Path $jdkRoot -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
      $env:JAVA_HOME = $found.FullName
      $env:Path = (Join-Path $env:JAVA_HOME 'bin') + ';' + $env:Path
    }
  }

  $keytoolPath = Find-Keytool
  if (-not $keytoolPath) {
    Log-Fail 'JDK installed but keytool still not found. Close this window and open a new PowerShell, then re-run .\scripts\build-android.cmd'
  }
  Log-Ok ('JDK ready at ' + $env:JAVA_HOME)
  return $keytoolPath
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

Log-Step 'Building signed release APK (gradlew assembleRelease)...'
Push-Location $AndroidDir
& .\gradlew.bat assembleRelease
Pop-Location

if (Test-Path $ApkPath) {
  Log-Ok ('Done! APK ready: ' + $ApkPath)
  Write-Host ''
  Write-Host 'Transfer this file to your Android phone and tap to install.' -ForegroundColor Cyan
  Write-Host 'Important: Back up android\release-keystore.jks for future app updates.' -ForegroundColor Cyan
} else {
  Log-Fail 'Build finished but app-release.apk was not found.'
}
