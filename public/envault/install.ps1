# envault - Windows installer
# Usage: irm https://jawadboulmal.com/envault/install.ps1 | iex

$ErrorActionPreference = 'Stop'

function Write-Header {
    Write-Host ""
    Write-Host "  envault installer" -ForegroundColor Green
    Write-Host "  Zero-cloud .env encryption for teams" -ForegroundColor DarkGray
    Write-Host "  ─────────────────────────────────────────" -ForegroundColor DarkGray
    Write-Host ""
}

function Write-Step([string]$msg) {
    Write-Host "  . $msg" -ForegroundColor DarkGray
}

function Write-Success([string]$msg) {
    Write-Host "  + $msg" -ForegroundColor Green
}

function Write-Fail([string]$msg) {
    Write-Host ""
    Write-Host "  x $msg" -ForegroundColor Red
    Write-Host ""
    exit 1
}

function Refresh-Path {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path", "User")
}

Write-Header

# ── Node.js ───────────────────────────────────────────────────────────────────
Write-Step "Checking for Node.js..."
$nodeVersion = & node --version 2>$null

if ($nodeVersion) {
    Write-Success "Node.js $nodeVersion detected"
} else {
    Write-Step "Node.js not found — installing via winget..."

    $wingetAvailable = & winget --version 2>$null
    if (-not $wingetAvailable) {
        Write-Fail "winget is not available on this machine. Install Node.js manually from https://nodejs.org then re-run this script."
    }

    $ErrorActionPreference = 'Continue'
    & winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
    $ErrorActionPreference = 'Stop'

    Refresh-Path

    $nodeVersion = & node --version 2>$null
    if (-not $nodeVersion) {
        Write-Fail "Node.js installation failed. Install it manually from https://nodejs.org"
    }
    Write-Success "Node.js $nodeVersion installed"
}

# ── npm ───────────────────────────────────────────────────────────────────────
Write-Step "Checking for npm..."
$npmVersion = & npm --version 2>$null
if (-not $npmVersion) {
    Write-Fail "npm not found. Reinstall Node.js from https://nodejs.org"
}
Write-Success "npm $npmVersion detected"

# ── envault ───────────────────────────────────────────────────────────────────
$alreadyInstalled = & envault --version 2>$null
if ($alreadyInstalled) {
    Write-Step "Upgrading existing envault installation..."
} else {
    Write-Step "Installing envault..."
}

$ErrorActionPreference = 'Continue'
& npm install -g --force @jawadboulmal/envault
$ErrorActionPreference = 'Stop'

if ($LASTEXITCODE -ne 0) {
    Write-Fail "Installation failed. Try manually: npm install -g @jawadboulmal/envault"
}
Write-Success "envault installed"

# ── Verify ────────────────────────────────────────────────────────────────────
Write-Step "Verifying..."
Refresh-Path
$version = & envault --version 2>$null
if (-not $version) {
    Write-Fail "Verification failed. Open a new terminal and run: envault --version"
}
Write-Success "envault v$version is ready"

Write-Host ""
Write-Host "  Ready! Run this to generate your key pair:" -ForegroundColor Cyan
Write-Host ""
Write-Host "     envault init" -ForegroundColor White
Write-Host ""
