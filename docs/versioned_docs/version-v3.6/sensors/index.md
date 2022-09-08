---
title: Installing ThreatStryker Sensors
---

# Installing ThreatStryker Sensors

Your production workloads are monitored and scanned using ThreatStryker Sensors. The ThreatStryker Sensors are implemented as lightweight containers which monitor activity, discover workloads and retrieve manifests. They are deployed on your production infrastructure, and  communicate with the ThreatStryker Management Console over TLS, using the URL and API key.

A single ThreatStryker Console can manage multiple workload types, and on-premise and cloud deployments simultaneously.

## Before you Begin

Before you install the Sensors, obtain the Management Console URL and API key from the Management Console.

You should take care to install the sensor version that matches your Management Console version, as compatibility across versions is not guaranteed.

## Installing the ThreatStryker Sensors

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```

