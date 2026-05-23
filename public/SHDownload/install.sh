#!/bin/bash
# install.sh - The Automated One-Liner Installer for macOS/Linux
set -e

# Define standard terminal colors
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0;34m' # No Color (Reset)
WHITE='\033[1;37m'

echo -e "${CYAN}=========================================${NC}"
echo -e "${CYAN}      Installing shDownloader...        ${NC}"
echo -e "${CYAN}=========================================${NC}"

# 1. Ensure Local Installation Directory exists (Simulating AppData style in home folder)
InstallDir="$HOME/.vdDownloader"
if [ ! -d "$InstallDir" ]; then
    mkdir -p "$InstallDir"
fi

# 2. Pull down your repo files from your real GitHub account
BaseUrl="https://raw.githubusercontent.com/Skayologie/SHDownloader/main"
echo -e "${YELLOW}[1/4] Downloading application files...${NC}"

# Download the python engine file
curl -fsSL "$BaseUrl/shdownloader.py" -o "$InstallDir/shdownloader.py"

# Download the requirements file
curl -fsSL "$BaseUrl/requirements.txt" -o "$InstallDir/requirements.txt"

# Download or dynamically create the native bash runner file (Replaces shDownload.bat)
cat << 'EOF' > "$InstallDir/shDownload"
#!/bin/bash
python3 "$HOME/.vdDownloader/shdownloader.py" "$@"
EOF

# Make the runner file executable (CRUCIAL step on Unix filesystems)
chmod +x "$InstallDir/shDownload"


# 3. Handle Python dependencies cleanly
echo -e "${YELLOW}[2/4] Syncing Python dependencies...${NC}"
if command -v python3 &> /dev/null; then
    python3 -m pip install --upgrade -r "$InstallDir/requirements.txt" --quiet
else
    echo -e "${RED}Warning: Python execution engine not found on system PATH.${NC}"
fi


# 4. Handle System Media Dependencies (Mac alternative to winget using Homebrew if needed)
echo -e "${YELLOW}[3/4] Ensuring core system engines are ready...${NC}"
# Note: On Mac, the script skips automated dependency installations since you removed 
# FFmpeg merges inside the Python script. If needed, users install via 'brew install ffmpeg'.
echo -e " -> Skipping binary injection (Using lightweight pre-merged formats)..."


# 5. Connect to User Environment Variable Path (.zshrc or .bash_profile)
echo -e "${YELLOW}[4/4] Setting execution paths...${NC}"
ShellConfig="$HOME/.zshrc"

# Fallback check if user runs an older legacy Bash instance instead of Zsh
if [[ "$SHELL" == */bash ]]; then
    ShellConfig="$HOME/.bash_profile"
fi

# Safely check and inject the path into their shell configuration file
if ! grep -q "$InstallDir" "$ShellConfig" 2>/dev/null; then
    echo "" >> "$ShellConfig"
    echo "export PATH=\"\$PATH:$InstallDir\"" >> "$ShellConfig"
    echo -e "Successfully appended path to $ShellConfig"
else
    echo -e "shDownload execution path is already configured."
fi


echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN} Setup complete! Restart your terminal.  ${NC}"
echo -e "${WHITE} Command: shDownload <URL>               ${NC}"
echo -e "${GREEN}=========================================${NC}"