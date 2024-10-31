#!/bin/sh

# Running all checks for frontend-backend integration

# Checking backend accessibility from frontend container
FRONTEND_CONTAINER_NAME="volleyball-tournament-frontend-1"
BACKEND_URL="http://backend:5001/health"

# Adding curl to the frontend container if not already installed
echo "Ensuring curl is available in the frontend container..."
docker exec $FRONTEND_CONTAINER_NAME apk add --no-cache curl

# Checking backend accessibility
if ! docker exec $FRONTEND_CONTAINER_NAME curl -s $BACKEND_URL; then
  echo "Backend is not accessible from frontend container. Please check container connectivity."
else
  echo "Backend is accessible from frontend container."
fi

# Checking environment variable consistency in .env file
echo "Checking environment variable consistency in .env file..."
ENV_VAR="REACT_APP_API_URL"
EXPECTED_VALUE="http://localhost:5001"
CURRENT_VALUE=$(grep "$ENV_VAR" .env | cut -d '=' -f2)
if [ "$CURRENT_VALUE" != "$EXPECTED_VALUE" ]; then
  echo "Warning: Environment variable $ENV_VAR is not set correctly. Current value: $CURRENT_VALUE"
fi

# Inspecting Docker network to verify IPs
echo "Inspecting Docker network to verify IPs..."
docker network inspect volleyball-tournament_volleyball-network | grep -E '"Name":|"IPv4Address":'

# Checking CORS configuration in backend (manual check required)
echo "Checking CORS configuration in backend..."
cat backend/app.js | grep -A 5 'const corsOptions = {'

# Checking backend logs
echo "Checking backend logs..."
docker logs volleyball-tournament-backend-1 | grep 'Backend server is running'

# Performing curl check from frontend container
echo "Performing curl check from frontend container..."
docker exec $FRONTEND_CONTAINER_NAME curl -s $BACKEND_URL || echo "Curl check failed. Please verify connectivity."

# All checks completed
echo "All checks completed."

