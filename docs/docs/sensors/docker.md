---
title: Docker
---

# Docker

On a Linux-based Docker host, the ThreatStryker agents are deployed as a lightweight container.

Install a docker runtime on the Linux host.

For Windows Server hosts, experimental support exists, but it is not suitable for production use.

## Installation of ThreatStryker Sensors

The host or VM to be used for the Deepfence agents needs to have the docker runtime installed on it.

:::info
Image tags `quay.io/deepfenceio/deepfence_agent:2.1.1-multiarch` and `quay.io/deepfenceio/deepfence_cluster_agent:2.1.1-multiarch` are supported in amd64 and arm64/v8 architectures.
:::

### Docker

1. Download the following script: [start-agent.sh 🔗](https://docs.deepfence.io/threatstryker/files/v2.1/start-agent.sh)
    ```shell
    wget https://docs.deepfence.io/threatstryker/files/v2.1/start-agent.sh
    ```

2. To authenticate to the docker image repository, run the following command:

    ```bash
    docker login quay.io
    ```

   When prompted, please provide the credentials sent by email.

3. Run the script as follows:

    ```bash
    bash start-agent.sh -r <IP_ADDRESS_OF_UI_MACHINE> -k xxxxxxxx
    ```

### Podman

1. Download the following script: [start-podman-agent.sh 🔗](https://docs.deepfence.io/threatstryker/files/v2.1/start-podman-agent.sh)
    ```shell
    wget https://docs.deepfence.io/threatstryker/files/v2.1/start-podman-agent.sh
    ```

2. To authenticate to the docker image repository, run the following command:

    ```bash
    sudo podman login quay.io
    ```

   When prompted, please provide the credentials sent by email.

3. Run the script as follows:

    ```bash
    bash start-podman-agent.sh -r <IP_ADDRESS_OF_UI_MACHINE> -k xxxxxxxx
    ```

:::tip
Optionally the sensor container can be further tagged using ```USER_DEFINED_TAGS=""``` in the above command. Tags should be comma separated, for example, ```"dev,front-end"```.
:::

## Upgrade the ThreatStryker Sensors

To upgrade a sensor install, stop the existing sensor and start the new version.

## Using a Proxy Server with Docker

If ThreatStryker management console is accessed through a proxy server, add the proxy server details to the docker configuration.

Edit the file: `~/.docker/config.json`, and add the following content.  Remember to change the proxy server ip address from 111.111.111.111 to your proxy server ip:

```json
{
    "auths": {
        "https://index.docker.io/v1/": {
            "auth": ""
            }
    },
    "HttpHeaders": {
        "User-Agent": "Docker-Client/19.03.1 (linux)"
    },
    "proxies": {
        "default": {
            "httpProxy": "http://111.111.111.111:8006",
            "httpsProxy": "http://111.111.111.111:8006",
            "noProxy": "localhost,127.0.0.1"
            }
    }
}
```

Restart the docker daemon:

```bash
sudo systemctl restart docker
```

ThreatMapper agent VMs do not require any changes for proxy server.
