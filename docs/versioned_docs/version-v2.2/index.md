---
title: Introduction to ThreatStryker
---

# ThreatStryker

## Introducing Deepfence ThreatStryker

Deepfence ThreatStryker hunts for hidden threats in your production platforms, and ranks these threats based on their risk-of-exploit. You can then prioritize the issues that present the greatest risk to the security of your applications.

### Extends Security into Production 

Your 'Shift Left' initiatives enable you to deliver secure applications to production. ThreatStryker picks up once your applications have been deployed to production.


|     ![ThreatStryker Overview](img/threatmapper-overview.jpg)     |
|:----------------------------------------------------------------:|
| ThreatStryker Overview - Development, Pre-Deployment, Production |

#### Discover:

* **Discover Running Workloads:** ThreatStryker scans your platforms and identifies pods, containers, applications, and infrastructure.  Use ThreatStryker to discover the topology of your applications and attack surface.
* **Discover Cloud and Infrastructure Assets:** ThreatStryker queries platform APIs to map assets and their interrelationships, and calculate a topology graph.

#### Find Threats:

* **Discover Vulnerabilities:** ThreatStryker generates runtime SBOMs (Software Bill of Materials) of dependencies from running pods and containers, serverless apps, applications, and operating systems.  ThreatStryker matches these SBOMs against multiple vulnerability feeds to identify vulnerable components.
* **Discover Exposed Secrets:** Unprotected keys, tokens and passwords can provide malicious actors with opportunities to spread control and exploit nearby or remote systems.
* **Discover Configuration and Compliance Weaknesses:** ThreatStryker evaluates infrastructure configuration against multiple compliance benchmarks (CIS, PCI-DSS, HIPAA and others) to find weaknesses and mis-configurations that could pose a threat. 

#### Actionable Information:

* **Rank Threats by Risk-of-Exploit:** ThreatStryker ranks the discovered threats using CVSS and other severity scores, exploit method and their proximity to attack surface, in order to identify which issues pose the greatest risk of exploit


## What makes up the ThreatStryker product?

Deepfence ThreatStryker consists of the ThreatStryker Management Console, and a series of ThreatStryker Sensors:

The console uses **infrastructure APIs** to scan your production and non-production platforms and detect configuration errors and compliance weaknesses.
The console also takes data from **sensor agents** to calculate the topology of your applications, generate SBOMs to find vulnerabilities.

Infrastructure APIs are handled using **Cloud Scanner** tasks which reside within each platform and access the local cloud APIs.

On-host data is provided by ThreatStryker sensor agents.  These are deployed against each production host, and they forward SBOMs and telemetry securely to your dedicated console.   

| ![ThreatStryker Components](img/threatmapper-components.jpg) |
|:------------------------------------------------------------:|
|                   ThreatStryker Components                   |

## Learn More

Read on to discover more about the architecture, installation and operation of Deepfence ThreatStryker.
