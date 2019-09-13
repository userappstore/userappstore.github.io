clear 
if [ ! -z "$1" ]; then
  PARAM1="$1"
else
  PARAM1=""
fi
DASHBOARD_SERVER=$APP_STORE_DOCUMENTATION_DASHBOARD_SERVER \
STORAGE_PATH=/tmp/app-store-documentation-dashboard-server  \
node generate.js $PARAM1