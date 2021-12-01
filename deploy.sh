#!/bin/bash
yarn build
rm -rf builds/web/*
cp -r dist/* builds/web/
now="$(date +'%Y%m%d%M%S')"
filename="qlkd_web_${now}.tar.gz"
cd builds
tar -czf $filename  web
echo "$filename"
echo "Finished"