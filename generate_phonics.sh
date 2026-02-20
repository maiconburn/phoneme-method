#!/bin/bash

# Directory
TARGET_DIR="client/public/audio/phonics/en-GB"
mkdir -p "$TARGET_DIR"

# Voice
VOICE="Daniel"

# Define pairs: LETTER:PHONEME
pairs=(
"A:ah"
"B:buh"
"C:kuh"
"D:duh"
"E:eh"
"F:fff"
"G:guh"
"H:huh"
"I:ih"
"J:juh"
"K:kuh"
"L:lll"
"M:mmm"
"N:nnn"
"O:oh"
"P:puh"
"Q:kwuh"
"R:rrr"
"S:sss"
"T:tuh"
"U:uh"
"V:vvv"
"W:wuh"
"X:ks"
"Y:yuh"
"Z:zzz"
)

echo "Generating audio files using voice: $VOICE (rate 140)..."

for pair in "${pairs[@]}"; do
    letter="${pair%%:*}"
    phoneme="${pair##*:}"
    
    m4a_file="$TARGET_DIR/$letter.m4a"
    mp3_file="$TARGET_DIR/$letter.mp3"
    
    echo "Processing $letter ($phoneme)..."
    
    # Generate m4a with slower rate for clarity
    say -v "$VOICE" "[[rate 140]] $phoneme" -o "$m4a_file"
    
    # Convert to mp3 if ffmpeg exists
    if command -v ffmpeg &> /dev/null; then
        ffmpeg -y -i "$m4a_file" -acodec libmp3lame -q:a 2 "$mp3_file" > /dev/null 2>&1
        rm "$m4a_file"
    else
        echo "ffmpeg not found, keeping .m4a file."
    fi
done

echo "Done! Files saved to $TARGET_DIR"
