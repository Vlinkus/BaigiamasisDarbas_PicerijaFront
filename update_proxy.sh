#!/bin/bash

PACKAGE_JSON="package.json"

if [[ -f "$PACKAGE_JSON" ]]; then
    sed -i 's#"proxy": "http://localhost:8080"#"proxy": "https://pizzeria.pavlenkomaksim.com"#' "$PACKAGE_JSON"
    
    if grep -q '"proxy": "https://pizzeria.pavlenkomaksim.com"' "$PACKAGE_JSON"; then
        echo "Successfully updated the proxy value in $PACKAGE_JSON."
    else
        echo "Failed to update the proxy value in $PACKAGE_JSON."
    fi
else
    echo "File $PACKAGE_JSON does not exist. Please check the file path."
fi