clear 
if [ -z "$1" ]; then
  PARAM1="home"
else
  PARAM1=$1
fi
DASHBOARD_SERVER=$APP_STORE_DOCUMENTATION_DASHBOARD_SERVER \
STORAGE_PATH=/tmp/documentation  \
node generate.js $PARAM1