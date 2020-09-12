#!/bin/bash

project_root=$(realpath "$(dirname $0)/..")
target_dir="$project_root/docs"

mkdir "$target_dir" 2>/dev/null


for html in abs-guide/*.html; do
  node scripts/injectStyles.js "$html" > "$target_dir/$(basename $html)"

  # Fix relative urls
  sed -i ' s/\.\.\/images/images/g ' "$target_dir/$(basename $html)"
done


mkdir "$target_dir/styles" 2>/dev/null
cp -v "$project_root/styles/"* "$target_dir/styles/"
cp -v "$project_root/node_modules/highlight.js/styles/atom-one-dark.css" "$target_dir/styles/"

mkdir "$target_dir/images" 2>/dev/null
cp -v "$project_root/images/"* "$target_dir/images/"
