#!/bin/bash

# Check if the input file is provided
if [ -z "$1" ]; then
  echo "Usage: $0 input.mov [output_directory]"
  exit 1
fi

# Input .mov file
input_file=$1

# Output directory (optional, defaults to 'frames')
output_dir=${2:-frames}

# Create output directory if it does not exist
mkdir -p "$output_dir"

# Extract frames from the .mov file
ffmpeg -i "$input_file" "$output_dir/frame_%04d.png"

# Print a success message
echo "Frames extracted to directory: $output_dir"
