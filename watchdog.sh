#Runs the given argument in a way that if it crashes it is restarted after 5 seconds.
SLEEP_SECONDS=5
until $*; do
    echo "Crashed with exit code $?. Click CTRL-C now to exit. Respawning '$*' in $SLEEP_SECONDS seconds." >&2
    sleep "$SLEEP_SECONDS"
done
