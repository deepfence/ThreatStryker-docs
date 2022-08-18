---
title: Amazon ECS
---

# Amazon ECS

*Deployed as a daemon service using a task definition*

In Amazon ECS, the ThreatStryker sensors are deployed as a daemon service using task definition.


# Installing on Amazon ECS


1. Set up Amazon ECS by following the steps outlined here: [Set up to use Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/get-set-up-for-amazon-ecs.html)

2. Add the  Deepfence Quay secrets provided to AWS secrets manager by following the steps outlined here: [Private registry authentication for tasks](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/private-auth.html)

3. Give IAM permissions for ECS task execution role to access this secret as outlined here: [IAM roles for tasks](https://docs.aws.amazon.com/AmazonECS/latest/userguide/task-iam-roles.html)

4. Create new task definition for deepfence agent and deploy the service by following the steps outlined in the file: [ESC-DeepfenceAgent.pdf 🔗](../files/ECS-DeepfenceAgent.pdf)
