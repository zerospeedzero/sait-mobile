#!/bin/bash

base_url="http://localhost:3000/api/crawl?urls=http://localhost:3000/input/output_html_files/line%s.html&limit=2&indexName=langchain-chatbot"

# Generate URLs
urls=()
for ((line_number=2; line_number<=64; line_number++)); do
    urls+=("$(printf "$base_url" "$line_number")")
done

# Open Chrome for each URL
for url in "${urls[@]}"; do
    /usr/bin/open -a "/Applications/Google Chrome.app"  "$url" &
done
