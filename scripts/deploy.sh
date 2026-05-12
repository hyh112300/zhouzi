#!/usr/bin/env bash
set -euo pipefail

# Deployment script for zhouzi.icu
# Run on the server after git pull

echo "🚀 Deploying zhouzi.icu..."

PROJECT_DIR="/home/ubuntu/zhouzi"
cd "$PROJECT_DIR"

# 1. Pull latest code
echo "📦 Pulling latest code..."
git pull origin main

# 2. Build and restart Docker services
echo "🐳 Building and restarting Docker containers..."
sudo docker compose -f docker/docker-compose.yml build landing
sudo docker compose -f docker/docker-compose.yml up -d --no-deps landing

# 3. Reload Nginx
echo "🔄 Reloading Nginx..."
sudo docker compose -f docker/docker-compose.yml exec nginx nginx -s reload || true

# 4. Clean up old images
echo "🧹 Cleaning up..."
sudo docker image prune -f

echo "✅ Deployment complete!"
