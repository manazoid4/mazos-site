$ErrorActionPreference = "Stop"

$Base = "https://mazos-site.vercel.app/maz-pocket"
$Root = Join-Path $env:LOCALAPPDATA "MazWorks\MazCore"
$Zip = Join-Path $env:TEMP "MAZ-Core-latest.zip"

Write-Host "MAZ Core - verified one-shot setup"
$Manifest = Invoke-RestMethod -Uri "$Base/latest.json" -TimeoutSec 20
if (-not $Manifest.core.sha256) { throw "Release manifest is missing the MAZ Core SHA256." }

Write-Host "Downloading MAZ Core $($Manifest.version)..."
Invoke-WebRequest -Uri "$Base/core-latest.zip" -OutFile $Zip -UseBasicParsing
$Actual = (Get-FileHash $Zip -Algorithm SHA256).Hash.ToLowerInvariant()
$Expected = [string]$Manifest.core.sha256
if ($Actual -ne $Expected.ToLowerInvariant()) {
    Remove-Item $Zip -Force -ErrorAction SilentlyContinue
    throw "MAZ Core download hash mismatch. Nothing was installed."
}

New-Item -ItemType Directory -Force $Root | Out-Null
Expand-Archive -Path $Zip -DestinationPath $Root -Force
Remove-Item $Zip -Force -ErrorAction SilentlyContinue

$Installer = Join-Path $Root "install-core.ps1"
if (-not (Test-Path $Installer)) { throw "The verified package did not contain install-core.ps1." }

& $Installer
Write-Host ""
Write-Host "MAZ Core setup complete. Files live at: $Root"
