---
title: Kubernetes
---

# Kubernetes

*Deployed as a daemonset in a Kubernetes Cluster, using a helm chart*

In a Kubernetes environment, sensors are deployed as a **DaemonSet** on the Kubernetes cluster, using a helm chart.

## ThreatStryker Agents (Helm Chart)


In Kubernetes, ThreatStryker agents can be installed using a helm chart.

1.  Add helm repo:

	```bash
	helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise
	helm repo update
	helm search repo deepfence/deepfence-agent
	```

2.  Identify the IP address or DNS name used to access the ThreatStryker management console.  For example, if the address is
    192.168.1.10, use the following command:

	```bash
	helm install deepfence-agent deepfence/deepfence-agent \
	    --set registry.username=<deepfence_username> \
	    --set registry.password=<deepfence_password> \
	    --set managementConsoleUrl=192.168.1.10 \
	    --set deepfenceKey=xxxxxxxx \
	    --set image.tag=3.6.2 \
	    --set image.clusterAgentImageTag=3.6.2
	```

    The registry username and password to access the Deepfence Quay registry will be sent by email; check the README inside the package for detailed setup instructions.

	```bash
	helm show readme deepfence/deepfence-agent
	helm show values deepfence/deepfence-agent
	```

3.  To delete the ThreatStryker release that was installed by the helm chart, run the following command:

	```bash
	helm delete deepfence-agent
	```
