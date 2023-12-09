#!/bin/bash

# Create a directory to store HTML files
output_dir="output_html_files"
mkdir -p "$output_dir"

# Create main.html to store relative links
main_file="${output_dir}/main.html"
echo "<html><body>" > "$main_file"

# Read the content from train1.dat and generate HTML files
while IFS= read -r line; do
    # Increment the line number
    line_number=$((line_number + 1))

    # Create an HTML file for each line
    output_file="${output_dir}/line${line_number}.html"

    # Write the HTML content to the file
    cat > "$output_file" <<EOF
<html>
<body>
<p>${line}</p>
</body>
</html>
EOF

    # Append a relative link to main.html
    echo "<a href=\"${output_file}\">Line ${line_number}</a><br>" >> "$main_file"

    echo "Generated HTML file: $output_file"
done < "train1.dat"

echo "</body></html>" >> "$main_file"
echo "HTML files and main.html generated in the '$output_dir' directory."
