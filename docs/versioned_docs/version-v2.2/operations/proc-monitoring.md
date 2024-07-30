---
title: Process Monitoring
---

# Process Monitoring

Sensors are capable of analyzing process actions to identify if an attack is on going or starting.
When a potential attack is detected, an alert is generated and can be found in the runtime incidents section of the console.

## How does it work?

When Deepfence sensors are installed on an host, they are able to communicate with the Linux kernel available to start listening to process syscalls.
Process issue syscalls to communicate with the kernel. Our solution is able to monitor those access to determine if something is abnormal.

## How do I start process monitoring?

From the console it is possible to select an host and go to Runtime-Incident tab and then activate Process monitoring.
It is possible to activate multiple hosts at the same time from the topology view.

## How do I configure process monitoring?

You can change process monitoring configuration from the console: settings > agent configuration > Process Monitoring.
The configuration allow you to define rules. A rule can have three types:
- bin-execution, this will match process that are being executed.
- root-escalation, this will match process that were executing as a normal user but escalated to root permissions.
- termination-failure, this will match process that exited with a status other than 0.

For each rule, it is possible to define a severity based on whether an action was successful or not.
For instance, if a root escalation failed, it can be flagged with an higher severity than a successful root escalation.

On top of severity definition, it is also possible to skip certain commands: for instance `nice` is an inoffensive binary and we don't want to generate any alert for this program.
It is also possible to skip more globally by providing path to skip. If you want to skip alerting on program under `/usr/bin`, the path can be added.
The purpose of skipping is to limit the number of false positives.

## Why am I seeing too many false positives?

Deepfence aims at reducing the number of false positives and only deliver useful information to our users.
However, we sometimes might end up in a situation where we need human operator to decide how to treat the provided information.
As a result, our policy is to generate alerts even when we are not 100% sure an attack is ongoing.
We provide all the information required to look at the potential attack. From the information, some actions can be taken;
- You can add the program to the skip commands list
- If you have a set of safe programs, you can add them to the skipped paths list
