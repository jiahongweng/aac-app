#!/bin/bash

# This script is used to stop application
cd cd /var/www/html/aac-app
pm2 stop app.config.js || true