#!/bin/bash

project_root=$(realpath "$(dirname $0)/..")
target_dir="$project_root/docs"

mkdir "$target_dir" 2>/dev/null


for html in abs-guide/*.html; do
  node scripts/injectStyles.js "$html" > "$target_dir/$(basename $html)"

  # Fix relative urls
  sed -i ' s/\.\.\/images/images/g ' "$target_dir/$(basename $html)"
done


bash "$project_root/scripts/copy_assets.sh"
