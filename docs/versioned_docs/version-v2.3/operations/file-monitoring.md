---
title: File Monitoring
---

# File Integrity Analysis

Sensors are capable of analyzing the Filesystem access to identify if an attack is on going or starting.
When a potential attack is detected, an alert is generated and can be found in the runtime incidents section of the console.

## How does it work?

When Deepfence sensors are installed on an host, they are able to communicate with the Linux kernel available to start listening to file system accesses.
When analyzing the accesses, matching rules are applied. Currently the rules mostly listen to: Read, Write, Permission changes, Deletion & Execution (for kernels above 5.11).

Each rule defines a set of matching actions. When an action matches a certain payload, it increases a score and when the score reaches a given threshold, an alert is generated.

## How do I start Filesystem analysis?

From the console it is possible to select an host and go to Runtime-Incident tab and then activate File integrity analysis.
It is possible to activate multiple hosts at the same time from the topology view.

## How do I configure file integrity analysis?

You can change file integrity configuration from the console: settings > agent configuration > File Integrity.
The configuration allow you to listen to a directory by providing a path. It is possible to recursively listen to directory and files under that path.
For a given path, you can define a set of rule with an associated severity. Each rule can have the following type:
 - Create, will match any create action under the given path.
 - Write, will match any write action under the given path.
 - Read, will match any read action on a file under the given path.
 - Permission, will match any permission changes on a file under the given path.

## Why am I seeing too many false positives?

Deepfence aims at reducing the number of false positives and only deliver useful information to our users.
However, we sometimes might end up in a situation where we need human operator to decide how to treat the provided information.
As a result, our policy is to generate alerts even when we are not 100% sure an attack is ongoing.
We provide all the information required to look at the potential attack. From the information, some actions can be taken;
- If it turned out to be a false positive, the alert can be safely masked.
- If the associated rule is triggering too many alerts, the rule can be turned off.
- If it is a true positive, you can use network policy feature to block traffic.
