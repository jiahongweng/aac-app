#!/bin/bash

# This script is used to start the application
cd /var/www/html/aac-app
pm2 start app.config.js
