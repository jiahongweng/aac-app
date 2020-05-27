#!/bin/bash

# This script is executed after the source is copied to the instances
cd /var/www/html/aac-app

which nvm
which npm
which node

source /home/ubuntu/.bashrc

which nvm
which npm
which node

npm install
