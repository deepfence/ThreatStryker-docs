---
title: Deploying the Console
---

# Deploying the Management Console


## Requirements


The system requirements for the ThreatStryker Management Console are as follows:

| Property                                                          | Details         |
|-------------------------------------------------------------------|-----------------|
| CPU: No of cores                                                  | 8               |
| RAM                                                               | 16 GB or 32GB   |
| Disk space                                                        | At-least 120 GB |
| Port to be opened to view the UI and receive sensor agent traffic | 443             |

## Preparation

You will get an email with license key and registry credentials.

| Property          | Details                                            |
|-------------------|----------------------------------------------------|
| License key       | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx               |
| Organization      | xxxx corp                                          |         
| Number of hosts   | 10                                                 |  
| Admin email       | xxxx@xxxx.com                                      | 
| Registry username | xxxxxxxx                                           |
| Registry password | xxxxxxxx                                           |
| Documentation     | https://community.deepfence.io/docs/threatstryker/ |


## Docker Install

The host or VM to be used for the Deepfence management console needs to have the docker runtime installed. In addition, it also needs the binary **docker-compose** to be installed on it.

1. 1. Download docker compose file from here: [docker-compose.yml 🔗](../files/3.6.2/docker-compose.yml). To authenticate to the docker image repository, run the following command:

   ```bash
   docker login quay.io
   ```

   When prompted, please provide the credentials sent by email.

2. If docker-compose is not installed, install it: https://docs.docker.com/compose/install/

3. Run docker-compose file in that directory as follows:

   ```bash
   docker-compose -f docker-compose.yml up -d
   ```


Helm Chart Install
---------------------------------------


1. Add helm repo:

   ```bash
   helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise
   helm repo update
   helm search repo deepfence/deepfence-console
   ```

2. Run following command:

   ```bash
   helm install deepfence-router deepfence/deepfence-router \
       --namespace default
   helm install deepfence-console deepfence/deepfence-console \
       --set registry.username=<deepfence_username> \
       --set registry.password=<deepfence_password> \
       --set image.tag=3.6.2 \
       --namespace default
   ```

   The Quay username and password is provided by email. Check the README inside the package for detailed setup instructions.

   ```bash
   helm show readme deepfence/deepfence-console
   helm show values deepfence/deepfence-console
   ```

3. To get the management console ip address, run following command: ::

   ```bash
   kubectl get --namespace default svc deepfence-router -w
   ```

4. To delete deepfence console helm chart, run following command: ::

   ```bash
   helm delete deepfence-router -n default
   helm delete deepfence-console -n default
   ```