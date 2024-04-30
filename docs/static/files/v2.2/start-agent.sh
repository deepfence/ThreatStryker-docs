#!/bin/bash
#Any change made in this script needs to be made in upgrade-agent.sh script and
#in the golang code that uses that script
usage() {

  cat <<EOF

	usage: $0 <options>

	OPTIONS:
        -h Show this message
        -r IP Address / domain of Deepfence management console (Mandatory)
        -o Port of Deepfence management console (Mandatory. Default is 443)
        -k Deepfence key for auth
        -n Hostname to use in deepfence agent (Optional)
        -c Start packet capture (Y/N/"") (Optional. Default is "", which will take the configuration saved in management console)
        -f Start file and process integrity monitoring (Y/N) (Optional. Default is "Y")
        -p Packet capture percentage (Optional. Default is "100")
        -s Packet capture - snap length (Optional. Default is "65535")
        -t User defined tags, comma separated string (Optional)
        -i Add cloud instance id as suffix for hostname (Y/N) (Optional. Default is "N")
EOF
}

MGMT_CONSOLE_URL=""
MGMT_CONSOLE_PORT="443"

# Enable/Disable Traffic Analysis: Enable: "" / Disable: "Y"
DF_DISABLE_TRAFFIC_ANALYSIS=""

# Enable/Disable File Monitoring: Enable: "" / Disable: "Y"
DF_DISABLE_FILE_MON=""

# Enable/Disable Process Monitoring: Enable: "" / Disable: "Y"
DF_DISABLE_PROC_MON=""

# Enable/Disable Local Network Filter : Enable: "" / Disable: "Y"
DF_DISABLE_LOCAL_TRAFFIC_FILTER=""

# Enable/Disable reverse DNS : Enable: "" / Disable: "Y"
DF_DISABLE_REVERSE_DNS="Y"

# Log level: debug / info / error
DF_LOG_LEVEL="info"
USER_DEFINED_TAGS=""
DEEPFENCE_KEY=""
DF_HOSTNAME=""
INSTANCE_ID_SUFFIX="N"
IMAGE_REPOSITORY=${IMAGE_REPOSITORY:-quay.io/deepfenceio}

check_options() {
  if [ "$#" -lt 1 ]; then
    usage
    exit 0
  fi
  while getopts "c:f:k:i:n:r:o:t:h" opt; do
    case $opt in
    h)
      usage
      exit 0
      ;;
    r)
      MGMT_CONSOLE_URL=$OPTARG
      ;;
    o)
      MGMT_CONSOLE_PORT=$OPTARG
      ;;
    k)
      DEEPFENCE_KEY=$OPTARG
      ;;
    n)
      DF_HOSTNAME=$OPTARG
      ;;
    t)
      USER_DEFINED_TAGS="$OPTARG"
      ;;
    c)
      if [ "$OPTARG" == "Y" ] || [ "$OPTARG" == "y" ]; then
        DF_DISABLE_TRAFFIC_ANALYSIS=""
      elif [ "$OPTARG" == "N" ] || [ "$OPTARG" == "n" ]; then
        DF_DISABLE_TRAFFIC_ANALYSIS="1"
      fi
      ;;
    f)
      if [ "$OPTARG" == "Y" ] || [ "$OPTARG" == "y" ]; then
        DF_DISABLE_FILE_MON=""
        DF_DISABLE_PROC_MON=""
      elif [ "$OPTARG" == "N" ] || [ "$OPTARG" == "n" ]; then
        DF_DISABLE_FILE_MON="Y"
        DF_DISABLE_PROC_MON="Y"
      fi
      ;;
    i)
      if [ "$OPTARG" == "Y" ] || [ "$OPTARG" == "y" ]; then
        INSTANCE_ID_SUFFIX="Y"
      else
        INSTANCE_ID_SUFFIX="N"
      fi
      ;;
    *)
      usage
      exit 0
      ;;
    esac
  done
  if [ "$MGMT_CONSOLE_URL" == "" ]; then
    usage
    exit 0
  fi
  if [ "$MGMT_CONSOLE_PORT" == "" ]; then
    usage
    exit 0
  fi
  if [ "$DF_HOSTNAME" == "" ]; then
    DF_HOSTNAME=$(hostname)
  fi
}

kill_agent() {
  agent_running=$(docker ps --format '{{.Names}}' | grep "deepfence-agent")
  if [ "$agent_running" != "" ]; then
    docker rm -f deepfence-agent
  fi
}

start_agent() {
  docker run -dit \
    --cpus=".5" \
    --ulimit core=0 \
    --name=deepfence-agent \
    --restart on-failure \
    --pid=host \
    --net=host \
    --uts=host \
    --log-driver json-file \
    --log-opt max-size=50m \
    --privileged=true \
    -v /sys/kernel/debug:/sys/kernel/debug:rw \
    -v /sys/fs/bpf:/sys/fs/bpf:rw \
    -v /var/log/fenced \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /var/lib/docker/:/fenced/mnt/host/var/lib/docker/:rw \
    -v /:/fenced/mnt/host/:ro \
    -e DF_LOG_LEVEL=$DF_LOG_LEVEL \
    -e DF_DISABLE_FILE_MON="$DF_DISABLE_FILE_MON" \
    -e DF_DISABLE_PROC_MON="$DF_DISABLE_PROC_MON" \
    -e DF_DISABLE_LOCAL_TRAFFIC_FILTER="$DF_DISABLE_LOCAL_TRAFFIC_FILTER" \
    -e DF_DISABLE_REVERSE_DNS="$DF_DISABLE_REVERSE_DNS" \
    -e DF_DISABLE_TRAFFIC_ANALYSIS="$DF_DISABLE_TRAFFIC_ANALYSIS" \
    -e DF_ENABLE_PROCESS_REPORT="true" \
    -e DF_ENABLE_CONNECTIONS_REPORT="true" \
    -e INSTANCE_ID_SUFFIX="$INSTANCE_ID_SUFFIX" \
    -e USER_DEFINED_TAGS="$USER_DEFINED_TAGS" \
    -e MGMT_CONSOLE_URL="$MGMT_CONSOLE_URL" \
    -e MGMT_CONSOLE_PORT="$MGMT_CONSOLE_PORT" \
    -e SCOPE_HOSTNAME="$DF_HOSTNAME" \
    -e DEEPFENCE_KEY="$DEEPFENCE_KEY" \
    -e DF_USE_DUMMY_SCOPE="$DF_USE_DUMMY_SCOPE" \
    -e DF_USE_FAT_DUMMY_SCOPE="$DF_USE_FAT_DUMMY_SCOPE" \
    ${IMAGE_REPOSITORY}/deepfence_agent:"${DF_IMG_TAG:-2.2.0}"
}

main() {
  check_options "$@"
  kill_agent
  start_agent
}

main "$@"
