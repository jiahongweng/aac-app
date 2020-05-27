#!/bin/bash

# This script is executed after the source is copied to the instances
yum -y update

cd /var/www/html/aac-app
npm install
