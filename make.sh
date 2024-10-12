#!/bin/bash

# Path to the index.html file
INDEX_FILE="index.html"

# Remove existing script tags from the index.html file
sed -i '/<script.*src=.*<\/script>/d' "$INDEX_FILE"

# Find all JavaScript files in the current directory and its subdirectories
JS_FILES=$(find . -name "*.js")

# Placeholder for sketch.js and p5.min.js
SKETCH_FILE="sketch.js"
SKETCH_PATH=""
P5_MIN_FILE="p5-libraries/p5.min.js"
P5_MIN_PATH=""

# Add new script tags, handle p5.min.js and sketch.js specially
for JS_FILE in $JS_FILES; do
    # Escape the './' prefix if present
    JS_PATH=$(echo $JS_FILE | sed 's|^./||')

    if [[ $JS_PATH == $P5_MIN_FILE ]]; then
        # Store p5.min.js path to include it first in the <head> section
        P5_MIN_PATH=$JS_PATH
    elif [[ $JS_PATH == p5-libraries/* ]]; then
        # Add script to the <head> section if it's in the p5-libraries/ folder
        sed -i "/<\/head>/i\    <script src=\"$JS_PATH\"></script>" "$INDEX_FILE"
    elif [[ $JS_PATH == $SKETCH_FILE ]]; then
        # Store the path to sketch.js to include it later
        SKETCH_PATH=$JS_PATH
    else
        # Add other scripts to the <body> section
        sed -i "/<\/body>/i\    <script src=\"$JS_PATH\"></script>" "$INDEX_FILE"
    fi
done

# Add p5.min.js first in the <head> section if it was found
if [[ -n $P5_MIN_PATH ]]; then
    sed -i "/<head>/a\    <script src=\"$P5_MIN_PATH\"></script>" "$INDEX_FILE"
fi

# Add sketch.js last to the <body> section if it was found
if [[ -n $SKETCH_PATH ]]; then
    sed -i "/<\/body>/i\    <script src=\"$SKETCH_PATH\"></script>" "$INDEX_FILE"
fi

