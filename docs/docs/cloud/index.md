---
title: Deploying in Deepfence Cloud
---

# Deploying in Deepfence Cloud

Deepfence Cloud is a self-service portal from which you can create an organization and invite users to that organization. You can then deploy ThreatStryker console instances in any of the available clouds. Deepfence Cloud users in your organization have access to these consoles and can log in directly without any additional credentials.

Users are identified using a username/password combination or a social login (Google, GitHub, Microsoft). If your enterprise identity service integrates with one of the supported social logins, this brings the benefit of single sign-on for your users, and automatic off-boarding when a social login is deactivated.

Each console you deploy is a standalone instance in one of the Deepfence-supported cloud regions. The instances are deployed in one of several Kubernetes clusters, isolated by dedicated namespaces, and managed by Deepfence to assure their correct operation, scaling, upgrades and data isolation. Each ThreatStryker console has a dedicated, persistent DNS name, and manages its own API keys to authenticate traffic. You deploy ThreatStryker sensors as normal, using the DNS name to identify the management console and the API key to authenticate to the console.

### License & Validity

- Deepfence Cloud is free for 14 days, you can create up to 2 consoles and allows 20 hosts to be monitored 
- You can contact support@deepfence.io if you are interested in securing more hosts or to extend the license

:::info
- All the consoles and data will be deleted from Deepfence Cloud after 14 days from the date of expiry of license.
- Account admins are notified 5 days before deleting consoles.
:::