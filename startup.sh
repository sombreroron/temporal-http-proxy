#!/bin/bash

# Check if SEARCH_ATTRIBUTES environment variable is set
if [ -z "$SEARCH_ATTRIBUTES" ]; then
  echo "SEARCH_ATTRIBUTES environment variable is not set. Skipping search attribute creation."
else
  # Iterate over all keyword:type pairs in SEARCH_ATTRIBUTES
  IFS=',' read -r -a attributes <<< "$SEARCH_ATTRIBUTES"
  for attribute in "${attributes[@]}"; do
    # Extract keyword and type
    IFS=':' read -r keyword type <<< "$attribute"

    # Run the Temporal CLI command to create the search attribute
    echo "Creating search attribute: name=$keyword, type=$type"
    temporal operator search-attribute create --name="$keyword" --type="$type" --address="$TEMPORAL_HOST"

    # Check if the command was successful
    if [ $? -eq 0 ]; then
      echo "Search attribute $keyword created successfully."
    else
      echo "Failed to create search attribute $keyword."
      exit 1
    fi
  done
fi

# Run the command passed to the script (from CMD)
echo "Starting the Node.js application..."
exec "$@"