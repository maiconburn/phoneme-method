#!/bin/bash

# Directory
TARGET_DIR="client/public/audio/phonics/en-GB"
mkdir -p "$TARGET_DIR"

BASE_URL="https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds"

# Letters a-z
for letter in {a..z}; do
    src_file="$letter.m4a"
    dest_letter=$(echo "$letter" | tr '[:lower:]' '[:upper:]')
    dest_file="$dest_letter.mp3"
    
    echo "Downloading $src_file..."
    curl -s -o "$TARGET_DIR/$src_file" "$BASE_URL/$src_file"
    
    # Check if download succeeded (size > 0)
    if [ -s "$TARGET_DIR/$src_file" ]; then
        echo "Converting to $dest_file..."
        ffmpeg -y -i "$TARGET_DIR/$src_file" -acodec libmp3lame -q:a 2 "$TARGET_DIR/$dest_file" > /dev/null 2>&1
        rm "$TARGET_DIR/$src_file"
    else
        echo "Failed to download $src_file"
        rm "$TARGET_DIR/$src_file"
    fi
done

echo "Done! Real human audio files installed."
