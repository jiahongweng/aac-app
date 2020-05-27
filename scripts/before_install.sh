#!/bin/bash

# This script is executed before copying the source

sudo apt-get update

. /home/ubuntu/.nvm/nvm.sh

pm2 update
