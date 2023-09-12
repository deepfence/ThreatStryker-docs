---
title: Terraform
---

# Terraform

*Provision to GGP Compute Engine*

Use Terraform to provision Deepfence ThreatStryker on GCP Compute Engine

## Initialize


Initialize terraform:

```
terraform init
```

### Variables


Create a new file terraform.tfvars with following values:

```bash
ssh_private_key = "~/deepfence/deepfence_console.pem"
ssh_public_key = "~/deepfence/deepfence_console_public.pem"
gcp_project_id = "deepfence-console-123456"
gcp_service_account_json = "~/deepfence/terraform-123456-458c1e0fce03.json"
```

 * Set up a service account in GCP: https://cloud.google.com/docs/authentication/getting-started#cloud-console
 * This service account should have permissions to create vm
 * The GCP zone is set to `us-west1-a`. Please change it if needed in `vars.tf`

## Create Deepfence Management Console VM

Create the deepfence management console VM:

```bash
terraform apply
```
