#! /bin/sh
### BEGIN INIT INFO
# Provides: værhøna
# Required-Start: $remote_fs $syslog
# Required-Stop: $remote_fs $syslog
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: Værhøna
# Description: This file starts and stops Værhøna
# 
### END INIT INFO

APP_DIR=/var/www/html/vaerhona

case "$1" in
 start)
   NODE_ENV=production AWS_PROFILE=production forever start --sourceDir=$APP_DIR --silent --uid "vaerhona" --append index.js
   ;;
 stop)
   forever stop vaerhona
   ;;
 restart)
   NODE_ENV=production AWS_PROFILE=production forever restart --sourceDir=$APP_DIR --silent --uid "vaerhona" --append index.js
   ;;
 *)
   echo "Usage: vaerhona {start|stop|restart}" >&2
   exit 3
   ;;
esac