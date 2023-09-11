---
title: Kubernetes Installation
---

# Kubernetes Installation

You can install the Management Console on a [single Docker host](docker) or in a dedicated Kubernetes cluster.

## Install the ThreatStryker Management Console

The following instructions explain how to install the ThreatStryker console on a Kubernetes Cluster, and configure external access to the Console.  For detailed instructions for custom installs, see [Console](`helm show readme`) and [Router](https://github.com/deepfence/ThreatStryker/tree/master/deployment-scripts/helm-charts/deepfence-router) notes.

1. **Configure Persistent Volume**:

    ## Cloud Managed
    
    If the Kubernetes cluster is hosted in a cloud provider, it is recommended to use cloud managed storage
    ```
    kubectl get storageclass
    ```
    - AWS: gp3
    - GCP: standard

    ## Self-Managed: OpenEBS

    ```bash
    helm repo add openebs https://openebs.github.io/charts
    helm repo update
    helm install openebs --namespace openebs openebs/openebs --create-namespace
    ```
    
    ... and wait (```-w```) for the openebs pods to start up:
    
    ```bash
    kubectl get pods -o wide --namespace openebs -w
    ```

2. **Install the metrics server** (optional)

    If the metrics server is not already installed (```kubectl get deployment metrics-server -n kube-system```), install as follows:

    ```bash
    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
    ```

3. **Install the ThreatStryker Console**

    ```bash
    helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise
    
    # helm show readme deepfence/deepfence-console | less
    # helm show values deepfence/deepfence-console | less

    helm install deepfence-console deepfence/deepfence-console \
    --set registry.username="<deepfence_username>" \
    --set registry.password="<deepfence_password>" \
    --set global.imageTag=2.0.0 \
    --set global.storageClass=gp3 \
    --namespace default
    ```

    ... and wait for the pods to start up:

    ```bash
    kubectl get pods -o wide -w
    ```

4. **Enable external access** with the ```deepfence-router``` helm chart:

    Deploy deepfence-router:

    ```bash
    # helm show values deepfence/deepfence-router | less
   
    helm install deepfence-router deepfence/deepfence-router
    ```

    ... and wait for the cloud platform to deploy an external load-balancer:

    ```bash
    kubectl get --namespace default svc -w deepfence-router
    ```

Now proceed to the [Initial Configuration](initial-configuration).

### Delete the ThreatStryker Management Console

To delete the ThreatStryker Management Console

   ```bash
   helm delete deepfence-router
   helm delete deepfence-console
   ```


## Fine-tune the Helm deployment

```bash
helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/enterprise

helm show values deepfence/deepfence-console > deepfence_console_values.yaml

# Make the changes in this file and save
vim deepfence_console_values.yaml

helm install -f deepfence_console_values.yaml deepfence-console deepfence/deepfence-console \
    --namespace default
```
