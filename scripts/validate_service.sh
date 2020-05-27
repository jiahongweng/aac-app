listenCount=$(netstat -an | grep 3000 | grep LISTEN | wc -l)

if [ "$listenCount" -lt 1 ]; then
  exit 1
else
  exit 0
fi
