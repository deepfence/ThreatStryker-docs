---
title: Network Monitoring
---

# Network Traffic Analysis

Sensors are capable of analyzing the network traffic to identify if an external attack is on going or starting.
When an external attack is detected, an alert is generated and can be found in the runtime incidents section of the console.

## How does it work?

When Deepfence sensors are installed on an host, they are able to read the incoming and outgoing tcp packets and have access to TCP & HTTP payloads.
When analyzing the traffic, rules are applied. Those rules are mainly coming from two sources:
- [Core Rule Set](https://owasp.org/www-project-modsecurity-core-rule-set/)
- [Emerging threat](https://docs.suricata.io/en/suricata-6.0.4/rules/intro.html)

Each rule defines a set of matching actions. When an action matches a certain payload, it increases a score and when the score reaches a given threshold, an alert is generated.

## How do I start traffic analysis?

From the console it is possible to select an host and activate "runtime traffic analysis".
It is possible to activate multiple hosts at the same time.

## How do I configure traffic analysis?

You can change network traffic analysis configuration from the console: settings > agent configuration > Traffic Analysis.
The configuration allow you to:
- Listen to all the TCP/HTTP traffic happening on a host
- Listen to traffic of specific processes only
- Listen to all traffic but some specific process
- Listen to HTTPS traffic

On top of configuration what type of traffic we can monitor, you can also choose what rules to apply:
- For outgoing traffic
- For incoming traffic

By default, we recommend to activate the traffic analysis across all processes and with all the rules activated.

## Why am I seeing too many false positives?

Deepfence aims at reducing the number of false positives and only deliver useful information to our users.
However, we sometimes might end up in a situation where we need human operator to decide how to treat the provided information.
As a result, our policy is to generate alerts even when we are not 100% sure an attack is ongoing.
We provide all the information required to look at the potential attack. From the information, some actions can be taken;
- If it turned out to be a false positive, the alert can be safely masked.
- If the associated rule is triggering too many alerts, the rule can be turned off.
- If it is a true positive, you can use network policy feature to block traffic.

## Why is traffic analysis having CPU & memory usage?

Traffic analysis is a resource intensive process. Our engineering team is making big effort to reduce the footprint of network analysis.
If have issues, it might be worth changing the configuration, by:
- Reducing the rules applied
- Listen to specific processes
