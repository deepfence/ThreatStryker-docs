---
title: Docker
---

# Docker 

*Deployed on the Docker runtime*

:::info
Note that the ThreatStryker sensor is not limited to observing only docker containers.  The sensor can also scan and observe other processes on the host.

You can observe and manage a bare-metal or VM-based host by installing a docker runtime within, specifically to run the ThreatStryker sensor container.
:::

## ThreatStryker Agents (Linux)

The host or VM to be used for the Deepfence agents needs to have the docker runtime installed on it.

1. Download the following script: [start-agent.sh 🔗](../files/3.7.1/start-agent.sh)
2. To authenticate to the docker image repository, run the following command:

    ```bash
    docker login quay.io
    ```

    When prompted, please provide the credentials sent by email.

3. Run the script in that directory as follows:

    ```bash
    bash start-agent.sh -r <IP_ADDRESS_OF_UI_MACHINE> -k xxxxxxxx
    ```

## ThreatStryker Agents (Windows)

Deepfence Agents on Windows are experimental.  Thy have been tested (but are not supported) on Windows Server *greater than* 1709, and require virtualization support (Azure VMs with V3 family disks).

Installation Steps

1. Open PowerShell command prompt

2. Execute the command `Set-ExecutionPolicy ‘unrestricted’`

3. Go to the directory `installation_scripts/docker_windows/deepfence_agent`

4. Run the script `./install-deps-all.ps1`

5. The above scripts checks and installs the dependencies, and if required, will restart the server for the new installations to reflect

6. Now, run the script `./install-deps-post-restart.ps1`

   The above scripts checks and installs dependencies post restart.

7. To start the ThreatStryker agent, if the IP address of the VM or host that has the ThreatStryker management console is 192.168.1.10, use the following command:

    ```bash
    /run-deepfence.ps1 -r 192.168.1.10 -cve_scan_dir "C:\Program Files"
    ```

### Start/Stop/Restart ThreatStryker agent

The `run-deepfence.ps1` script stops any existing running ThreatStryker agent instance before it starts a new instance. This script can be used to restart ThreatStryker agent in case there is any change in the parameters passed to the agent.

To stop the ThreatStryker Agent, use `./stop-deepfence.ps1`

:::info
If Docker is already pre-installed, make sure the Docker server’s `daemon.json` has **experimental** field set to true. `daemon.json` can be found at its default location `C:\ProgramData\docker\config\`
:::

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

ThreatStryker agent VMs do not require any changes for proxy server.


