indexFile=/usr/share/nginx/html/index.html

sed -i "s/BACKEND_URL/${BACKEND_URL}/g" $indexFile
sed -i "s/ENV/${ENV}/g" $indexFile
sed -i "s/CLIENT_BACKEND_URL/${CLIENT_BACKEND_URL}/g" $indexFile

nginx -g "daemon off;"