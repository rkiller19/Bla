#!/bin/sh
cp default.conf.template /etc/nginx/conf.d/default.conf

if [ -z "${PORT}" ]; then
  echo "Listen: port 80 (default)"
else
  echo "Listen: port $PORT (from ENVironment)"
  sed -i "s/\(listen 0.0.0.0:\).*\( default_server\)/\1$PORT\2/" /etc/nginx/conf.d/default.conf
fi

if [ $AUTH_USER ] && [ $AUTH_PASSWD ]; then
  echo "Mode: secure (AUTHenticated)"
  echo -n $AUTH_USER: > /etc/nginx/.htpasswd
  echo $AUTH_PASSWD | openssl passwd -apr1 -stdin >> /etc/nginx/.htpasswd
  sed -i "s/\(auth_basic \).*\(;\)/\1\"Restricted Content\"\2/" /etc/nginx/conf.d/default.conf
else
  echo "Mode: open (NOT AUTHenticated)"
fi

nginx -g 'daemon off;'
