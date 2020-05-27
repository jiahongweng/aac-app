#!/bin/bash

# This script is executed after the source is copied to the instances
cd /var/www/html/aac-app

. /home/ubuntu/.nvm/nvm.sh

npm install
