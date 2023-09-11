---
title: Docker Installation
---

# Docker Installation

The quickest and easiest way to install the ThreatStryker Management Console is to use the pre-built images.  These instructions use pre-built ThreatStryker containers from [DockerHub](https://hub.docker.com/u/deepfenceio).

You can install the Management Console on a single Docker host or [in a dedicated Kubernetes cluster](kubernetes).

## Install the ThreatStryker Management Console - Single Docker Host

The following instructions explain how to get started with a docker-based installation on a single host system:

1. To authenticate to the Quay registry, run the following command:

   ```bash
   docker login quay.io
   ```

   When prompted, please provide the credentials sent by email.

2. Download docker compose file from here: [docker-compose.yml 🔗](../files/docker-compose.yml). Run docker-compose file in that directory as follows:

   ```bash
   docker compose up -d
   ```

Now proceed to the [Initial Configuration](initial-configuration).

### Remove the ThreatStryker Management Console

Remove the ThreatStryker Management Console as follows:

```bash
docker compose down
```

You can then prune the images and volumes if they are no longer required:

```bash
docker image prune
docker volume prune
```
