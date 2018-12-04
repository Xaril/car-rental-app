#Starts the interface, making it accessible at port 80
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PYTHONPATH="${PYTHONPATH}:$DIR"
./watchdog.sh python /usr/local/bin/twistd -n web --port "tcp:port=80" --wsgi run_app.app
