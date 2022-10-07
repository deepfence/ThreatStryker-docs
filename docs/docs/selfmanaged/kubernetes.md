---
title: Kubernetes Installation
---

# Deploying the Management Console in Kubernetes Cluster

## Requirements

The system requirements for the ThreatStryker Management Console kubernetes cluster are as follows:

| Property         | Details         |
|------------------|-----------------|
| No of nodes      | 3               |
| CPU: No of cores | 4               |
| RAM              | 16 GB           |
| Disk space       | At-least 120 GB |


## Helm Chart Install

Following helm charts have to be installed
- [deepfence-console](#deepfence-console-helm-chart): pod deployments
- [deepfence-router](#deepfence-router-helm-chart): external facing k8s service - for connecting from browser and sensor agents

## Quick start

```bash
helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise

helm install deepfence-console deepfence/deepfence-console \
    --set registry.username="<deepfence_username>" \
    --set registry.password="<deepfence_password>" \
    --set image.tag=3.7.1 \
    --set volume.storageClass=default \
    --namespace default

helm install deepfence-router deepfence/deepfence-router \
   --namespace default

kubectl get --namespace default svc deepfence-router -w
```

## Detailed setup instructions

## Storage
If cloud managed persistent volume is not available, OpenEBS can be used
```bash
kubectl create ns openebs
helm install openebs \
  --namespace openebs \
  --repo "https://openebs.github.io/charts" openebs \
  --set analytics.enabled=false
```
Storage class for OpenEBS
```yaml
volume:
  storageClass: openebs-hostpath
```

## Metrics server
- Check if metrics server is installed
```bash
kubectl get deployment metrics-server -n kube-system
```
- If not installed, run following command
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

## Deepfence Console Helm Chart

```bash
helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise
```

- Create values file
```bash
helm show values deepfence/deepfence-console > deepfence_console_values.yaml
```
- Edit values file and set registry username and password
```yaml
registry:
  name: "quay.io"
  imagePrefix: "quay.io/"
  username: ""
  password: ""
```
- Set image tag
```yaml
image:
  tag: 3.7.1
```
- (Optional) Set custom ssl certificate.

Certificates should be in the current directory and have names *.key and *.crt.
If not set, deepfence provided self-signed certificate will be used.
```yaml
# Use custom ssl certificate for Deepfence UI
# Copy *.key and *.crt file to current directory (same directory as values.yaml file)
# Supported file extensions are .crt and .key (.pem, .cert not supported)
tls:
  certFile: "my_server.crt"
  keyFile: "my_server.key"
```
- Set storage class

Any cloud managed Persistent Volumes can be set here, value will be `gp3` or `gp2` in AWS and `default` or `standard` in other clouds.
:::tip
To get available storage classes, run the following command

> kubectl get storageclass
:::

```yaml
volume:
  storageClass: default
```
- (Optional) Set database

Deepfence uses elasticsearch, postgres, redis, which are deployed in-cluster by default in HA mode.
It can be easily configured to use cloud managed databases like RDS for postgres, AWS elasticsearch service for elasticsearch.
Set the hostnames and ports accordingly.

Check [here](managed-database.md) to configure cloud-managed database
```yaml
db:
  #  Change following values accordingly if using externally managed database
  postgresUserDb:
    host: deepfence-postgres
    port: "5432"
    user: "cve"
    password: "cve"
    dbname: "users"
    sslmode: "disable"
  elasticsearch:
    scheme: "http"
    host: deepfence-es
    port: "9200"
    user: ""
    password: ""
  redis:
    host: deepfence-redis
    port: "6379"
```
- Set container runtime socket path. By default, docker is disabled and containerd is enabled.
:::tip
To get container runtime in the k8s cluster, run the following command
> kubectl get nodes -o=custom-columns=NAME:.metadata.name,Runtime:.status.nodeInfo.containerRuntimeVersion
:::
```yaml
# Mount container runtime socket path to agent pod. Agent will detect which runtime it is using these files.
mountContainerRuntimeSocket:
  dockerSock: false
  # Change if socket path is not the following
  dockerSockPath: "/var/run/docker.sock"
  containerdSock: true
  # Change if socket path is not the following
  containerdSockPath: "/run/containerd/containerd.sock"
```
- Install deepfence-console helm chart with values file
```bash
helm install -f deepfence_console_values.yaml \
  deepfence-console deepfence/deepfence-console \
  --namespace default
```
- Wait for pods to start up
```bash
kubectl get pods -o wide -w
```
- Get deepfence management console ip
```bash
kubectl get --namespace default svc deepfence-router -w
```

### Delete deepfence-console helm chart
```bash
helm delete deepfence-console
```

## Deepfence Router Helm Chart

- Create values file
```bash
helm show values deepfence/deepfence-router > deepfence_router_values.yaml
```
- Set cloud provider
```yaml
# Cloud Provider: aws, azure, gcp, ibm_cloud, open_stack
# cloudProvider is required to set appropriate LoadBalancer annotations
cloudProvider: "aws"
```
- Set management console port (default: 443)
```yaml
# Configure port for browser / agents
managementConsolePort: "443"
```
- Static IP address is recommended in production. Static public ip should be created in the same region/zone/resource group as the cluster.
- AWS:
    - Use `awsEipAllocations` field. Create same number of elastic ip addresses as the number of subnets.
- Azure and Google Cloud:
    - Use `loadBalancerIP` field.
- Self managed kubernetes:
    - Use `externalIPs`. Details [here](https://kubernetes.io/docs/concepts/services-networking/service/#external-ips).
- If ip address is not set, kubernetes (cloud managed) will create an ip address, which will be deleted if helm chart is deleted or if `deepfence-router` service is deleted.

### Router Service
- By default, LoadBalancer will be `external`
- This can be changed to `internal` if all agents can access management console using internal ip address and user has set up ssh tunneling for port 443 from local desktop.
```yaml
service:
  name: deepfence-router
  # Select the type of service to be used. 
  # When exposing the service in an on premisses Kubernetes cluster, select NodePort as type
  # Also, possible to use Ingress as type when ingress controller is installed
  type: LoadBalancer # NodePort/Ingress
  # Nodeport configuration. Only used when selecting NodePort in the service type
  nodePortHttps: ""
  nodePortHttp: ""
  #  Using static ip address for load balancer
  # - Google Cloud: https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip
  # loadBalancerIP: "1.2.3.4"
  # - Azure: https://docs.microsoft.com/en-us/azure/aks/static-ip
  # loadBalancerIP: "1.2.3.4"
  loadBalancerIP: ""
  # - AWS: (v1.16+) https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html#kubernetes-1.16
  # Static ip for NLB: awsEipAllocations: "eipalloc-0123456789abcdefg,eipalloc-0123456789hijklmn"
  awsEipAllocations: ""
  # LoadBalancer type: external or internal
  loadBalancerType: "external"
  # If loadBalancerType is "external", we recommend setting loadBalancerSourceRanges to the ip address / CIDR ranges
  # of your laptop's ip or corporate CIDR range. If this is set empty, ports 443 and 80 will be open to the public internet.
  # Example: ["143.231.0.0/16","210.57.79.18/32"]
  loadBalancerSourceRanges: []
  # ACM SSL certificate for AWS Classic LoadBalancer (This cannot be set if awsEipAllocations is set)
  # https://aws.amazon.com/premiumsupport/knowledge-center/terminate-https-traffic-eks-acm/
  # Example: "arn:aws:acm:{region}:{user id}:certificate/{id}"
  awsLoadBalancerAcmArn: ""
  # externalIPs: When kubernetes is not cloud managed, add public ip addresses of kubernetes nodes to externalIPs
  externalIPs: []
  externalTrafficPolicy: "Cluster"
```
- Install deepfence-router helm chart with values file
```bash
helm install -f deepfence_router_values.yaml \
  deepfence-router deepfence/deepfence-router \
  --namespace default
```

### Delete deepfence-router helm chart
```bash
helm delete deepfence-router
```
