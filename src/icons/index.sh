#!/usr/bin/env bash

script_dir=$(dirname "$0")
cd "$script_dir"
svg_files=$(ls *.svg)
lottie_files=$(ls *.lottie.json)

> index.ts

for file in $svg_files; do
  icon_name=$(basename "$file" .svg)
  echo "export { default as i_$icon_name } from './$icon_name.svg?url';" >> index.ts
done

for file in $lottie_files; do
  icon_name=$(basename "$file" .lottie.json)
  echo "export { default as a_$icon_name } from './$icon_name.lottie.json';" >> index.ts
done

cd - > /dev/null
