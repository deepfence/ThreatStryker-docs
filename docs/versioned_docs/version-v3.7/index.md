---
title: Introduction to ThreatStryker
---

# Introduction to ThreatStryker

Modern applications are highly distributed and dynamic, often running as containerized microservices in public, hybrid or multi cloud deployments. 

[Deepfence ThreatStryker](https://deepfence.io/threatstryker/) observes, correlates, learns, and acts to protect your cloud-native applications, across clouds and on-prem locations.

1. Inspecting the production platforms, looking for potential vulnerabilities, exposed secrets and compliance exceptions
1. Observing network traffic ‘indicators of attack’ and on-host/in-container ‘indicators of compromise’
1. Identifying the presence of attack behavior and neutralizing attacks before they result in compromise of your applications


| ![Discover and Scan Workloads and Hosts](img/intro-1.png) | ![Gather Attack Intel from Workloads and Network](img/intro-2.png) | ![Protect Applications from Exploit and Spread](img/intro-3.png) |
| :--: | :--: | :--: |
| *Discover and Scan Workloads and Hosts* | *Gather Attack Intel from Workloads and Network* | *Protect Applications from Exploit and Spread* |


ThreatStryker supports applications running in cloud-native platforms (kubernetes, serverless, docker) and virtual machines/bare metal, across multiple clouds and on-prem locations.

 * ThreatStryker discovers all running containers, processes, and online hosts, and presents a live and interactive color-coded view of the topology. It audits containers and hosts to detect vulnerable components, and interrogates configuration to identify file system, process, and network related misconfigurations. ThreatStryker assesses compliance using industry and community standard benchmarks.

 * ThreatStryker performs deep inspection of network traffic, system, and application behavior, and accumulates suspicious events over time. Events are classified and correlated against known vulnerabilities and suspicious patterns of behavior, in order to detect active threats with minimal false positives.

 * If suspicious patterns of behavior are detected, the intent of the behavior is deduced and ThreatStryker takes appropriate and contained remedial action. Tainted workloads are deleted, frozen, or restarted, sources of attack traffic are temporarily or permanently blocked, and alerts are raised to SIEM and monitoring systems. Attackers are stopped in their tracks, attacks are neutralized, and lateral spread is prevented.

## ThreatStryker and ThreatMapper

ThreatStryker builds on the functionality of the open-source [ThreatMapper](https://github.com/deepfence/ThreatMapper/) security platform:


* [ThreatMapper](https://github.com/deepfence/ThreatMapper/) identifies security risks - software vulnerabilities, exposed secrets - in your production platforms, and prioritizes them so you know which to fix first
* [ThreatStryker](https://deepfence.io/threatstryker) observes network traffic and application behavior relating to both known (discovered by ThreatStryker) and unknown (zero-day or app-specific) risks, identifies ongoing attacks and provides automated and guided protection to prevent attacks from spreading

Use ThreatStryker to find risks in your production platforms, and ThreatStryker to observe attack behavior and secure against exploit.