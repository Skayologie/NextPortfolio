#!/bin/sh
# envault - macOS / Linux installer
# Usage: curl -fsSL https://jawadboulmal.com/envault/install.sh | sh

set -e

GREEN='\033[0;32m'
GRAY='\033[0;90m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

header()  {
    printf "\n${GREEN}  envault installer${NC}\n"
    printf "${GRAY}  Zero-cloud .env encryption for teams\n"
    printf "  ─────────────────────────────────────────${NC}\n\n"
}
step()    { printf "${GRAY}  . $1${NC}\n"; }
success() { printf "${GREEN}  + $1${NC}\n"; }
fail()    { printf "\n${RED}  x $1${NC}\n\n"; exit 1; }

header

# ── Node.js ──────────────────────────────────────────────────────────────────
step "Checking for Node.js..."

if command -v node > /dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    success "Node.js $NODE_VERSION detected"
else
    step "Node.js not found — installing via nvm..."

    # Install nvm
    NVM_INSTALL="https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh"
    curl -fsSL "$NVM_INSTALL" | sh

    # Load nvm in current shell
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

    if ! command -v nvm > /dev/null 2>&1; then
        fail "nvm installation failed. Install Node.js manually from https://nodejs.org"
    fi

    nvm install --lts
    nvm use --lts

    NODE_VERSION=$(node --version)
    success "Node.js $NODE_VERSION installed"
fi

# ── npm ──────────────────────────────────────────────────────────────────────
step "Checking for npm..."
if ! command -v npm > /dev/null 2>&1; then
    fail "npm not found. Reinstall Node.js from https://nodejs.org"
fi
NPM_VERSION=$(npm --version)
success "npm $NPM_VERSION detected"

# ── envault ──────────────────────────────────────────────────────────────────
if command -v envault > /dev/null 2>&1; then
    step "Upgrading existing envault installation..."
else
    step "Installing envault..."
fi

npm install -g --force @jawadboulmal/envault --silent
success "envault installed"

# ── Verify ───────────────────────────────────────────────────────────────────
step "Verifying..."
VERSION=$(envault --version 2>/dev/null || echo "")
if [ -z "$VERSION" ]; then
    fail "Verification failed. Open a new terminal and run: envault --version"
fi
success "envault v$VERSION is ready"

printf "\n${CYAN}  Ready! Run this to generate your key pair:${NC}\n\n"
printf "     envault init\n\n"
