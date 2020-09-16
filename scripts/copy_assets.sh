#!/bin/bash

project_root=$(realpath "$(dirname $0)/..")
target_dir="$project_root/docs"

echo "Copying styles"
mkdir -p "$target_dir/styles" 2>/dev/null
cp -v "$project_root/styles/"* "$target_dir/styles/"
cp -v "$project_root/node_modules/highlight.js/styles/atom-one-dark.css" "$target_dir/styles/"

echo "Copying images"
mkdir -p "$target_dir/images" 2>/dev/null
cp -v "$project_root/images/"* "$target_dir/images/"
