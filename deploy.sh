#!/bin/bash

if [ $# != 1 ]; then
    echo "Usage: ./deploy.sh description"
    exit 1
fi

git add .
git commit -m "$1"
git push origin master
git push clever master
