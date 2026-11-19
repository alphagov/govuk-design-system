#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

base_ref="${1:-origin/main}"
head_ref="${2:-HEAD}"
output_file="${3:-build.diff}"
output_dir="$(dirname "$output_file")"
html_diff_file="$output_dir/build-html.diff"
css_diff_file="$output_dir/build-css.diff"
js_diff_file="$output_dir/build-js.diff"

tmp_dir="$(mktemp -d "${TMPDIR:-/tmp}/build-diff-ci.XXXXXX")"
base_build_dir="$tmp_dir/base-build"
head_build_dir="$tmp_dir/head-build"
original_ref="$(git rev-parse --verify HEAD)"

cleanup() {
  set +e
  git checkout --force "$original_ref" >/dev/null 2>&1
  rm -rf "$tmp_dir"
}
trap cleanup EXIT

echo "Checking out base ref: $base_ref"
git checkout --force "$base_ref"

echo "Building base ref"
npm ci
npm run build
cp -R build "$base_build_dir"

echo "Checking out head ref: $head_ref"
git checkout --force "$head_ref"

echo "Building head ref"
npm ci
npm run build
cp -R build "$head_build_dir"

echo "Diffing build folders"
mkdir -p "$output_dir"
diff -ruN "$base_build_dir" "$head_build_dir" > "$output_file" || true

echo "Splitting diff by file type"
: > "$html_diff_file"
: > "$css_diff_file"
: > "$js_diff_file"

awk \
  -v html_out="$html_diff_file" \
  -v css_out="$css_diff_file" \
  -v js_out="$js_diff_file" '
  function target(path) {
    if (path ~ /\.html$/) return html_out
    if (path ~ /\.css$/) return css_out
    if (path ~ /\.(js|mjs|cjs)$/) return js_out
    return ""
  }

  /^diff -ruN / {
    current_file = ""
    path = $NF
    sub(/^.*\/base-build\//, "", path)
    sub(/^.*\/head-build\//, "", path)
    current_file = target(path)
  }

  {
    if (current_file != "") print >> current_file
  }
' "$output_file"

echo "Saved diff to $output_file"
echo "Saved HTML diff to $html_diff_file"
echo "Saved CSS diff to $css_diff_file"
echo "Saved JavaScript diff to $js_diff_file"
