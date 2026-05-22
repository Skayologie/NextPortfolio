# install.ps1 - The Automated One-Liner Installer
$ErrorActionPreference = "Stop"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "      Installing shDownloader...        " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Ensure Local AppData Directory exists
$InstallDir = Join-Path $env:LOCALAPPDATA "vdDownloader"
if (-not (Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir | Out-Null
}

# 2. Pull down your repo files (Update with your actual paths)
$BaseUrl = "https://raw.githubusercontent.com/Skayologie/SHDownloader/main"
Write-Host "[1/4] Downloading application files..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "$BaseUrl/shdownloader.py" -OutFile (Join-Path $InstallDir "shdownloader.py")
Invoke-WebRequest -Uri "$BaseUrl/shDownload.bat" -OutFile (Join-Path $InstallDir "shDownload.bat")

# 3. Handle Python dependencies cleanly with the full extras flag
Write-Host "[2/4] Syncing Python dependencies..." -ForegroundColor Yellow
if (Get-Command python -ErrorAction SilentlyContinue) {
    # Installing "yt-dlp[default]" forces the inclusion of ejs challenge solvers
    python -m pip install --upgrade "yt-dlp[default]" --quiet
} else {
    Write-Host "Warning: Python execution engine not found on system PATH." -ForegroundColor Red
}

# 4. Handle System Media & JS Dependencies automatically via winget
Write-Host "[3/4] Ensuring core system engines are ready..." -ForegroundColor Yellow
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host " -> Installing FFmpeg engine..." -ForegroundColor Cyan
    winget install Gyan.FFmpeg --silent --accept-source-agreements --accept-package-agreements | Out-Null
}
if (-not (Get-Command deno -ErrorAction SilentlyContinue)) {
    Write-Host " -> Installing Deno JS runtime..." -ForegroundColor Cyan
    winget install Denoland.Deno --silent --accept-source-agreements --accept-package-agreements | Out-Null
}

# 5. Connect to User Environment Variable Path
Write-Host "[4/4] Setting execution paths..." -ForegroundColor Yellow
$CurrentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if (-not ($CurrentPath -split ";" -contains $InstallDir)) {
    [Environment]::SetEnvironmentVariable("PATH", "$CurrentPath;$InstallDir", "User")
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host " Setup complete! Restart your terminal.  " -ForegroundColor Green
Write-Host " Command: shDownload <URL>            " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Green