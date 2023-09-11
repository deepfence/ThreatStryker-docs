---
title: Deploying with Self-Managed
---

## Preparation

You will get an email with license key and registry credentials.

| Property          | Details                                       |
|-------------------|-----------------------------------------------|
| License key       | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx          |
| Organization      | xxxx corp                                     |         
| Number of hosts   | 20                                            |  
| Admin email       | xxxx@xxxx.com                                 | 
| Registry username | xxxxxxxx                                      |
| Registry password | xxxxxxxx                                      |
| Documentation     | https://docs.deepfence.io/threatstryker/docs/ |

## Deployment Architecture

![Enterprise Deployment Architecture](../img/entdeployment_arch.jpg)


A ThreatStryker deployment consists of two components, the ThreatStryker console, and the ThreatStryker sensor agent. The ThreatStryker console is the management plane and ThreatStryker sensor agents are
deployed on the production infrastructure. The machine assigned to run the ThreatStryker console needs to have **port 443** open, so that the ThreatStryker agents can share the runtime telemetry with the console. 

You should control access to the Deepfence Management Console, so that it is only accessible on port 443 from those systems that have installed the Deepfence agent, and from the systems that require access to the Console GUI and API.

If you encounter any security-related issues with ThreatStryker, please [reach out to us](https://github.com/deepfence/ThreatMapper/blob/master/SECURITY.md).

