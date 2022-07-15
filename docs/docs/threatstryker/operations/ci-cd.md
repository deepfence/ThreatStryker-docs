---
title: CI-CD Integration
---

# CI-CD Integration

*Integrate with popular CI/CD pipelines*

You can use ThreatStryker to scan artifacts in a CI (Continuous Integration) pipeline.  If a vulnerability is detected and the CI build is blocked, the ThreatStryker agent will submit the details to the ThreatStryker management console. The console will then forward details to the configured notification services.

## Configuring CI Scanning

The ThreatStryker CI action supports several CI pipelines, including CircleCI, GitLab and Jenkins.  It blocks a build if the number of CVE violations exceeds a user-defined threshold, or if the total CVE score exceeds a threshold, and notifications are submitted to the configured management console.

If a build is not blocked, ThreatStryker silently allows it to proceed.

For configuration details, refer to the appropriate [CI/CD Integrations](https://github.com/deepfence/ThreatMapper/tree/master/ci-cd-integrations), including:

 * [CircleCI](https://github.com/deepfence/ThreatMapper/tree/master/ci-cd-integrations/circleci)
 * [GitLab](https://github.com/deepfence/ThreatMapper/tree/master/ci-cd-integrations/gitlab)
 * [Jenkins](https://github.com/deepfence/ThreatMapper/tree/master/ci-cd-integrations/jenkins)
