---
title: Sumo Logic
---

# Sumo-Logic

*Collect Events and Activity Logs*

You can forward ThreatStryker Events and ThreatStryker Activity Logs to Sumo Logic.

## ThreatStryker Events

Under "Manage data", navigate to "Collection"

![Sumo Logic Collections](../img/deepfence_sumologic.jpg)

Click on "Add Collector" and select "Hosted Collector"

![Choose a Hosted Collector](../img/deepfence_collector.jpg)

Fill in the details and save the new collector

![Configure the Collector](../img/deepfence_collectorhosted.jpg)

Choose to add "Source" to the newly created collector and choose "HTTP Logs & Metrics"

![Select the Source](../img/deepfence_cloudapi.jpg)

Fill in the Source details and click save

![Define the Source Details](../img/deepfence_cloudapidetails.jpg)

Copy the resulting URL from the Deepfence Sumo Logic integration page

![Copy the API URL](../img/deepfence_cloudapiintegration.jpg)

Enter this into the "HTTP Endpoint" parameter in the ThreatStryker configuration for the Sumo Logic SIEM Integration.

![HTTP Endpoint](../img/deepfence_sumologicIntegration.jpg)


## ThreatStryker User Activity Logs

User activity logs or user audit logs can be exported to Sumo Logic integration.

Follow the steps to add the Sumo Logic Integration in Deepfence and select the option "User Activities" in alert type. Choose the duration from the drop down and click on "Subscribe".

