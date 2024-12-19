#!/bin/bash

# Install required packages if not already installed
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

if ! command -v serve &> /dev/null; then
    sudo npm install -g serve
fi

# Navigate to project directory
cd /home/ubuntu/car-inspection

# Pull latest changes if using Git
# git pull origin main

# Install dependencies and build
cd frontend
npm install
npm run build

# Start/Restart the application using PM2
pm2 delete car-inspection-frontend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo "Deployment complete!"