#!/bin/bash

# Function to recursively generate the tree
generate_tree() {
  # The first argument is the directory to scan
  local directory="$1"
  # The second argument is the prefix for the tree lines (for indentation)
  local prefix="$2"
  
  # Set shopt for robust globbing
  shopt -s nullglob dotglob

  # Create an array of all items in the directory (including hidden ones)
  local items=("$directory"/*)

  # Get the number of items
  local num_items=${#items[@]}
  local count=0

  # Loop through each item in the directory
  for item in "${items[@]}"; do
    ((count++))
    local filename=$(basename "$item")

    # Check if the current item is the last one in the list
    local is_last=$((count == num_items))
    local line_prefix="${prefix}$(if [[ $is_last -eq 1 ]]; then echo "└── "; else echo "├── "; fi)"

    # Print the item with the correct prefix
    echo "$line_prefix$filename"

    # If the item is a directory, recursively call the function for it
    if [[ -d "$item" ]]; then
      # Determine the new prefix for the next level
      local new_prefix="${prefix}$(if [[ $is_last -eq 1 ]]; then echo "    "; else echo "│   "; fi)"
      generate_tree "$item" "$new_prefix"
    fi
  done
}

# The starting point: call the function with the current directory and an empty prefix
generate_tree "." ""