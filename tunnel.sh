#!/bin/bash

# Add the Cloudflare GPG key
sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# Add Cloudflare repo
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

# Update package lists and install cloudflared
sudo apt-get update && sudo apt-get install cloudflared

# Start Cloudflare tunnel and verify
cloudflared tunnel --url http://localhost:8080

