#!/bin/bash

# This script is used to start the application
cd /var/www/html/aac-app

. /home/ubuntu/.nvm/nvm.sh
source /home/ubuntu/.bashrc

pm2 start app.config.js
