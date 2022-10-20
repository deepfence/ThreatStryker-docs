---
title: Kubernetes
---

# Kubernetes

*Deployed as a daemonset in a Kubernetes Cluster, using a helm chart*

In a Kubernetes environment, sensors are deployed as a **DaemonSet** on the Kubernetes cluster, using a helm chart.

## Quick start

Identify the IP address or DNS name used to access the ThreatStryker management console.  For example, if the address is 192.168.1.10, use the following command:

```bash
helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise
helm repo update

helm install deepfence-agent deepfence/deepfence-agent \
    --set registry.username=<deepfence_username> \
    --set registry.password=<deepfence_password> \
    --set managementConsoleUrl=192.168.1.10 \
    --set deepfenceKey=xxxxxxxx \
    --set image.tag=3.7.1 \
    --set image.clusterAgentImageTag=3.7.1 \
    --set clusterName=xxxxxxxx \
    --set mountContainerRuntimeSocket.dockerSock=false \
    --set mountContainerRuntimeSocket.containerdSock=true \
    --set trafficAnalysis.start=Y \
    --set trafficAnalysis.mode=all \
    --set dfFim=Y \
    --namespace deepfence \
    --create-namespace
```
The registry username and password to access the Deepfence Quay registry will be sent by email.
:::info
`clusterName` is the name / identifier of the cluster. It should be different for different kubernetes clusters. Example: prod-cluster-1, test-cluster.
:::
:::tip
To get container runtime in the k8s cluster, run the following command
> kubectl get nodes -o=custom-columns=NAME:.metadata.name,Runtime:.status.nodeInfo.containerRuntimeVersion
::: 

## Detailed setup instructions

```bash
helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise
```

- Create values file
```bash
helm show values deepfence/deepfence-agent > deepfence_agent_values.yaml
```
- Edit values file and set registry username and password
```yaml
registry:
  name: "quay.io"
  # Set registry username and password provided by Deepfence
  # This will create a secret called "deepfence-docker-secret"
  username: ""
  password: ""
```
- Set Deepfence management console ip address
```yaml
managementConsoleUrl: ""
```
- Set image tag
```yaml
image:
  # deepfence agent runs as a daemonset in all nodes in the cluster
  name: quay.io/deepfenceio/deepfence_agent
  tag: 3.7.1
  # cluster agent runs as a single pod
  clusterAgentImageName: quay.io/deepfenceio/deepfence_discovery
  clusterAgentImageTag: 3.7.1
  pullPolicy: Always
  pullSecretName: deepfence-docker-secret
```
- Set deepfence auth key
  Set authentication key when it is enabled in management console
```yaml
# Auth: Get deepfence api key from UI -> Settings -> User Management
deepfenceKey: ""
```
- (Optional) Start Traffic Analysis
  Enable/disable Traffic Analysis on startup. This can be later changed from UI also.
```yaml
# trafficAnalysis:
#   start: "Y"/"N"
#   processes: "sshd:943, docker-proxy:27017, /usr/local/go/bin/go:753"
#   mode: "allow"/"deny"/"all"
trafficAnalysis:
  start: ""
  processes: ""
  mode: ""
```
- (Optional) Instance id suffix
  Custom Amazon Machine Images might have same hostnames for multiple instances. This can be used to distinguish vm's.
```yaml
# Suffix cloud instance id to hostnames
instanceIdSuffix: "N"
```
- Set kubernetes cluster name
```yaml
# Set custom name for the cluster and hostname prefix for agent vm's to easily identify in Deepfence UI.
# Example: prod-cluster or dev1-cluster
# It will be suffixed with hostname - prod-cluster-aks-agentpool-123456-vmss000001
clusterName: ""
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
  crioSock: false
  # Change if socket path is not the following
  crioSockPath: "/var/run/crio/crio.sock"
```
- Install deepfence-agent helm chart with values file
```bash
helm install -f deepfence_agent_values.yaml deepfence-agent deepfence/deepfence-agent \
    --namespace deepfence \
    --create-namespace
```
- Wait for pods to start up
```bash
kubectl get daemonset -n deepfence
kubectl get pods -n deepfence
```

## Uninstall agents 

	```bash
	helm delete deepfence-agent -n deepfence
	```

## Openshift

1.  Add helm repo:

	```bash
	helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise
	helm repo update
	helm search repo deepfence/deepfence-agent
	```

2.  Identify the IP address or DNS name used to access the ThreatStryker management console.  For example, if the address is *192.168.1.10*, use the following command:

	```bash
	helm install deepfence-agent deepfence/deepfence-agent \
		--set registry.username=<registry_username> \
		--set registry.password=<registry_password> \
		--set managementConsoleUrl=192.168.1.10 \
		--set deepfenceKey=xxxxxxxx \
		--set image.tag=3.7.1 \
		--set image.clusterAgentImageTag=3.7.1 \
		--set clusterName=xxxxxxxx \
		--set mountContainerRuntimeSocket.dockerSock=false \
		--set mountContainerRuntimeSocket.containerdSock=true \
		--set trafficAnalysis.start=Y \
		--set trafficAnalysis.mode=all \
		--set dfFim=Y \
		--set mountContainerRuntimeSocket.dockerSock=false \
		--set mountContainerRuntimeSocket.containerdSock=true \
		--set mountContainerRuntimeSocket.containerdSockPath="/var/run/crio/crio.sock" \
		--set tolerations=null \
		--namespace deepfence \
		--create-namespace
	```

    The registry username and password to access the Deepfence Quay registry will be sent by email; check the README inside the package for detailed setup instructions.

	```bash
	helm show readme deepfence/deepfence-agent
	helm show values deepfence/deepfence-agent
	```

3. ThreatStryker agents need privileged permissions to execute on openshift, run below commands to add privileged permisions to deepfence-agent service account

   ```bash 
   oc adm policy add-scc-to-user privileged -z deepfence-agent -n deepfence
   ```

3.  To delete the ThreatStryker release that was installed by the helm chart, run the following command:

	```bash
	helm delete deepfence-agent -n deepfence
	```