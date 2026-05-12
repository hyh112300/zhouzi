#!/usr/bin/env bash
set -euo pipefail

# Server initialization script for zhouzi.icu
# Run ONCE on a fresh Ubuntu server

echo "🚀 Setting up zhouzi.icu server..."

# 1. System updates
echo "📦 Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y

# 2. Install Docker
echo "🐳 Installing Docker..."
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 3. Add current user to docker group
sudo usermod -aG docker "$USER"

# 4. Clone repository
echo "📦 Cloning repository..."
git clone git@github.com:hyh112300/zhouzi.git /home/ubuntu/zhouzi

# 5. Initialize SSL certificate
echo "🔒 Setting up SSL certificate..."
sudo apt-get install -y certbot
sudo certbot certonly --standalone -d zhouzi.icu -d www.zhouzi.icu --non-interactive --agree-tos -m admin@zhouzi.icu

# 6. Copy SSL certs for Docker
mkdir -p /home/ubuntu/zhouzi/docker/nginx/ssl
sudo cp -L /etc/letsencrypt/live/zhouzi.icu/fullchain.pem /home/ubuntu/zhouzi/docker/nginx/ssl/
sudo cp -L /etc/letsencrypt/live/zhouzi.icu/privkey.pem /home/ubuntu/zhouzi/docker/nginx/ssl/
sudo chown -R ubuntu:ubuntu /home/ubuntu/zhouzi/docker/nginx/ssl

# 7. Create certbot webroot
sudo mkdir -p /var/www/certbot
sudo chown ubuntu:ubuntu /var/www/certbot

# 8. Build & start services
echo "🐳 Starting Docker services..."
cd /home/ubuntu/zhouzi
docker compose -f docker/docker-compose.yml up -d

echo "✅ Server setup complete!"
echo "⚠️  Log out and back in for docker group changes to take effect."
