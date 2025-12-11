#!/bin/bash
# GHL API Helper Script
# Usage: source .ghl-helper.sh

# Check if .env file exists
if [ -f .env ]; then
    echo "📄 Loading credentials from .env file..."
    export $(grep -v '^#' .env | xargs)
    echo "✅ Environment variables loaded"
else
    echo "⚠️ .env file not found. Create one using .env.example as template"
    exit 1
fi

# Verify required variables are set
if [ -z "$GHL_API_TOKEN" ] || [ -z "$GHL_LOCATION_ID" ]; then
    echo "❌ Error: GHL_API_TOKEN or GHL_LOCATION_ID not set"
    echo "Please check your .env file"
    exit 1
fi

echo "✅ GHL credentials ready:"
echo "   Location ID: ${GHL_LOCATION_ID}"
echo "   Token: ${GHL_API_TOKEN:0:15}... (hidden)"
echo ""
echo "📚 Available helper functions:"
echo "   ghl_list_forms     - List all forms"
echo "   ghl_list_pipelines - List all pipelines"
echo "   ghl_test_token     - Test if token is valid"

# Helper function: List forms
ghl_list_forms() {
    echo "📋 Fetching forms from GHL..."
    curl -X GET "https://services.leadconnectorhq.com/forms/?locationId=${GHL_LOCATION_ID}" \
      -H "Authorization: Bearer ${GHL_API_TOKEN}" \
      -H "Version: 2021-07-28" \
      -H "Content-Type: application/json" \
      2>/dev/null | python3 -m json.tool
}

# Helper function: List pipelines
ghl_list_pipelines() {
    echo "📊 Fetching pipelines from GHL..."
    curl -X GET "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${GHL_LOCATION_ID}" \
      -H "Authorization: Bearer ${GHL_API_TOKEN}" \
      -H "Version: 2021-07-28" \
      2>/dev/null | python3 -m json.tool
}

# Helper function: Test token
ghl_test_token() {
    echo "🧪 Testing GHL API token..."
    response=$(curl -s -X GET "https://services.leadconnectorhq.com/forms/?locationId=${GHL_LOCATION_ID}" \
      -H "Authorization: Bearer ${GHL_API_TOKEN}" \
      -H "Version: 2021-07-28" \
      -w "\n%{http_code}")
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" = "200" ]; then
        echo "✅ Token is valid and working!"
        return 0
    else
        echo "❌ Token test failed (HTTP $http_code)"
        echo "$response" | head -n -1
        return 1
    fi
}

export -f ghl_list_forms
export -f ghl_list_pipelines
export -f ghl_test_token
