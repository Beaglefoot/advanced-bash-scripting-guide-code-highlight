#!/bin/bash

project_root=$(realpath "$(dirname $0)/..")

cp -v "$project_root/node_modules/highlight.js/styles/atom-one-dark.css" "$project_root/styles/"
