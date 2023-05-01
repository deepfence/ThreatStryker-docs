---
title: Docker Installation
---

# Deploying the Management Console in Docker

You can install the Management Console on a single Docker host or [in a dedicated Kubernetes cluster](kubernetes).

## Requirements

The system requirements for the ThreatStryker Management Console are as follows:

| Property                                                          | Details         |
|-------------------------------------------------------------------|-----------------|
| CPU: No of cores                                                  | 8               |
| RAM                                                               | 32GB            |
| Disk space                                                        | At-least 120 GB |
| Port to be opened to view the UI and receive sensor agent traffic | 443             |


## Docker Install

The host or VM to be used for the Deepfence management console needs to have the docker runtime installed.

1. Prepare the host by installing the necessary docker and docker-compose packages. [Increase Virtual Memory settings](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html) as required by the ElasticSearch component:

    ```bash
    sudo sysctl -w vm.max_map_count=262144
    ```

2. To authenticate to the docker image repository, run the following command:

   ```bash
   docker login quay.io
   ```

   When prompted, please provide the credentials sent by email.

3. Download docker compose file from here: [docker-compose.yml 🔗](../files/3.7.3/docker-compose.yml). Run docker-compose file in that directory as follows:

   ```bash
   docker compose -f docker-compose.yml up -d
   ```

### Remove the ThreatStryker Management Console

Remove the ThreatStryker Management Console as follows:

```bash
docker-compose -f docker-compose.yml down
```

You can then prune the images and volumes if they are no longer required:

```bash
docker image prune
docker volume prune
```

## Docker configuration
In Amazon Linux / RHEL, number of open files per container has to be configured.

```shell
$ cat /etc/sysconfig/docker
# The max number of open files for the daemon itself, and all
# running containers. The default value of 1048576 mirrors the value
# used by the systemd service unit.
DAEMON_MAXFILES=1048576
# Additional startup options for the Docker daemon, for example:
# OPTIONS=” — ip-forward=true — iptables=true”
# By default we limit the number of open files per container
OPTIONS=" — default-ulimit nofile=1024:4096"
```
You can change the desired value as below.
```shell
OPTIONS=" — default-ulimit nofile=1024000:1024000"
```
Restart Docker daemon
